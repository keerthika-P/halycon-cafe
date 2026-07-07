package com.halycon.cafe.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDtos {

    @Getter @Setter
    public static class PlaceOrderRequest {
        private String deliveryAddress;
        private String deliveryPhone;
        private String paymentMethod; // RAZORPAY, UPI_QR, COD
    }

    @Getter @Setter @Builder
    public static class OrderItemResponse {
        private String itemName;
        private Integer quantity;
        private BigDecimal priceAtOrder;
    }

    @Getter @Setter @Builder
    public static class OrderResponse {
        private Long orderId;
        private BigDecimal totalAmount;
        private String status;
        private String paymentStatus;
        private String paymentMethod;
        private LocalDateTime createdAt;
        private List<OrderItemResponse> items;
    }

    @Getter @Setter @Builder
    public static class RazorpayOrderResponse {
        private String razorpayOrderId;
        private String razorpayKeyId;
        private BigDecimal amount;
        private String currency;
        private Long localOrderId;
    }

    @Getter @Setter
    public static class VerifyPaymentRequest {
        private Long orderId;
        private String razorpayOrderId;
        private String razorpayPaymentId;
        private String razorpaySignature;
    }
}
