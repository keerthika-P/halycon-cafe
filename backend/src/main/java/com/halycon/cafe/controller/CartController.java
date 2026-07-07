package com.halycon.cafe.controller;

import com.halycon.cafe.dto.CartDtos.*;
import com.halycon.cafe.service.CartService;
import com.halycon.cafe.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final AuthUtil authUtil;

    @GetMapping
    public CartResponse getCart() {
        return cartService.getCart(authUtil.currentUserId());
    }

    @PostMapping
    public CartResponse addToCart(@RequestBody AddToCartRequest req) {
        return cartService.addToCart(authUtil.currentUserId(), req);
    }

    @PutMapping("/{menuItemId}")
    public CartResponse updateQuantity(@PathVariable Long menuItemId, @RequestParam int quantity) {
        return cartService.updateQuantity(authUtil.currentUserId(), menuItemId, quantity);
    }

    @DeleteMapping("/{menuItemId}")
    public CartResponse removeItem(@PathVariable Long menuItemId) {
        return cartService.removeItem(authUtil.currentUserId(), menuItemId);
    }

    @DeleteMapping
    public void clearCart() {
        cartService.clearCart(authUtil.currentUserId());
    }
}
