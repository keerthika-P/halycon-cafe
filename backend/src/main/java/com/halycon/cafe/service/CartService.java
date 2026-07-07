package com.halycon.cafe.service;

import com.halycon.cafe.dto.CartDtos.*;
import com.halycon.cafe.model.CartItem;
import com.halycon.cafe.model.MenuItem;
import com.halycon.cafe.model.User;
import com.halycon.cafe.repository.CartItemRepository;
import com.halycon.cafe.repository.MenuItemRepository;
import com.halycon.cafe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public CartResponse getCart(Long userId) {
        List<CartItem> items = cartItemRepository.findByUserId(userId);
        List<CartItemResponse> responses = items.stream().map(ci -> CartItemResponse.builder()
                .cartItemId(ci.getId())
                .menuItemId(ci.getMenuItem().getId())
                .name(ci.getMenuItem().getName())
                .imageUrl(ci.getMenuItem().getImageUrl())
                .price(ci.getMenuItem().getPrice())
                .quantity(ci.getQuantity())
                .subtotal(ci.getMenuItem().getPrice().multiply(BigDecimal.valueOf(ci.getQuantity())))
                .build()).collect(Collectors.toList());

        BigDecimal total = responses.stream().map(CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return CartResponse.builder().items(responses).total(total).build();
    }

    @Transactional
    public CartResponse addToCart(Long userId, AddToCartRequest req) {
        User user = userRepository.getReferenceById(userId);
        MenuItem menuItem = menuItemRepository.findById(req.getMenuItemId())
                .orElseThrow(() -> new IllegalArgumentException("Menu item not found"));

        CartItem cartItem = cartItemRepository.findByUserIdAndMenuItemId(userId, req.getMenuItemId())
                .orElse(CartItem.builder().user(user).menuItem(menuItem).quantity(0).build());

        int qty = req.getQuantity() == null ? 1 : req.getQuantity();
        cartItem.setQuantity(cartItem.getQuantity() + qty);
        cartItemRepository.save(cartItem);

        return getCart(userId);
    }

    @Transactional
    public CartResponse updateQuantity(Long userId, Long menuItemId, int quantity) {
        CartItem item = cartItemRepository.findByUserIdAndMenuItemId(userId, menuItemId)
                .orElseThrow(() -> new IllegalArgumentException("Item not in cart"));
        if (quantity <= 0) {
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }
        return getCart(userId);
    }

    @Transactional
    public CartResponse removeItem(Long userId, Long menuItemId) {
        cartItemRepository.findByUserIdAndMenuItemId(userId, menuItemId)
                .ifPresent(cartItemRepository::delete);
        return getCart(userId);
    }

    @Transactional
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }
}
