package com.halycon.cafe.service;

import com.halycon.cafe.dto.OrderDtos.*;
import com.halycon.cafe.model.*;
import com.halycon.cafe.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final CartItemRepository cartItemRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Transactional
    public Order createOrderFromCart(Long userId, PlaceOrderRequest req) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        if (cartItems.isEmpty()) {
            throw new IllegalStateException("Your cart is empty.");
        }

        User user = userRepository.getReferenceById(userId);

        BigDecimal total = cartItems.stream()
                .map(ci -> ci.getMenuItem().getPrice().multiply(BigDecimal.valueOf(ci.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = Order.builder()
                .user(user)
                .totalAmount(total)
                .deliveryAddress(req.getDeliveryAddress())
                .deliveryPhone(req.getDeliveryPhone())
                .paymentMethod(Order.PaymentMethod.valueOf(req.getPaymentMethod()))
                .status(Order.OrderStatus.PLACED)
                .paymentStatus(Order.PaymentStatus.PENDING)
                .build();

        List<OrderItem> orderItems = cartItems.stream().map(ci -> OrderItem.builder()
                .order(order)
                .menuItem(ci.getMenuItem())
                .itemName(ci.getMenuItem().getName())
                .quantity(ci.getQuantity())
                .priceAtOrder(ci.getMenuItem().getPrice())
                .build()).collect(Collectors.toList());

        order.setItems(orderItems);
        Order saved = orderRepository.save(order);

        cartItemRepository.deleteByUserId(userId);
        return saved;
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getUserOrders(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrder(Long orderId) {
        return toResponse(orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found")));
    }

    @Transactional
    public Order updateStatus(Long orderId, Order.OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    private OrderResponse toResponse(Order order) {
        return OrderResponse.builder()
                .orderId(order.getId())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus().name())
                .paymentStatus(order.getPaymentStatus().name())
                .paymentMethod(order.getPaymentMethod().name())
                .createdAt(order.getCreatedAt())
                .items(order.getItems().stream().map(oi -> OrderItemResponse.builder()
                        .itemName(oi.getItemName())
                        .quantity(oi.getQuantity())
                        .priceAtOrder(oi.getPriceAtOrder())
                        .build()).collect(Collectors.toList()))
                .build();
    }
}
