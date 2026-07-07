package com.halycon.cafe.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "menu")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false, length = 120)
    private String name;

    private String description;
    private String ingredients;

    @Column(nullable = false)
    private BigDecimal price;

    private Integer calories;

    @Builder.Default
    private BigDecimal rating = new BigDecimal("4.5");

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "is_veg")
    @Builder.Default
    private Boolean isVeg = true;

    @Column(name = "is_trending")
    @Builder.Default
    private Boolean isTrending = false;

    @Column(name = "is_chef_special")
    @Builder.Default
    private Boolean isChefSpecial = false;

    @Column(name = "is_popular")
    @Builder.Default
    private Boolean isPopular = false;

    @Column(name = "is_available")
    @Builder.Default
    private Boolean isAvailable = true;

    @Column(name = "order_count")
    @Builder.Default
    private Integer orderCount = 0;
}
