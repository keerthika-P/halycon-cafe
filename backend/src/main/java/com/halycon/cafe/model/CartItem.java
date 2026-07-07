package com.halycon.cafe.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "cart_items", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "menu_item_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_item_id", nullable = false)
    private MenuItem menuItem;

    @Builder.Default
    private Integer quantity = 1;

    @Column(name = "added_at")
    @Builder.Default
    private LocalDateTime addedAt = LocalDateTime.now();
}
