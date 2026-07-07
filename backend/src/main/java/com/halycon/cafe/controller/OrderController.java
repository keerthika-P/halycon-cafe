package com.halycon.cafe.controller;

import com.halycon.cafe.dto.OrderDtos.*;
import com.halycon.cafe.model.Order;
import com.halycon.cafe.service.OrderService;
import com.halycon.cafe.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final AuthUtil authUtil;

    @PostMapping
    public OrderResponse placeOrder(@RequestBody PlaceOrderRequest req) {
        Order order = orderService.createOrderFromCart(authUtil.currentUserId(), req);
        return orderService.getOrder(order.getId());
    }

    @GetMapping
    public List<OrderResponse> myOrders() {
        return orderService.getUserOrders(authUtil.currentUserId());
    }

    @GetMapping("/{orderId}")
    public OrderResponse getOrder(@PathVariable Long orderId) {
        return orderService.getOrder(orderId);
    }

    @PatchMapping("/{orderId}/status")
    public void updateStatus(@PathVariable Long orderId, @RequestParam String status) {
        orderService.updateStatus(orderId, Order.OrderStatus.valueOf(status));
    }
}
