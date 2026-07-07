package com.halycon.cafe.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private OrderStatus status = OrderStatus.PLACED;

    @Column(name = "delivery_address")
    private String deliveryAddress;

    @Column(name = "delivery_phone")
    private String deliveryPhone;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    @Builder.Default
    private PaymentMethod paymentMethod = PaymentMethod.RAZORPAY;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    @Builder.Default
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum OrderStatus { PLACED, PREPARING, PACKED, OUT_FOR_DELIVERY, DELIVERED, CANCELLED }
    public enum PaymentMethod { RAZORPAY, UPI_QR, COD }
    public enum PaymentStatus { PENDING, SUCCESS, FAILED }
}
