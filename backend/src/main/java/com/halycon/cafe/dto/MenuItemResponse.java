package com.halycon.cafe.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter @Setter @Builder
public class MenuItemResponse {
    private Long id;
    private String name;
    private String description;
    private String ingredients;
    private BigDecimal price;
    private Integer calories;
    private BigDecimal rating;
    private String imageUrl;
    private Boolean isVeg;
    private Boolean isTrending;
    private Boolean isChefSpecial;
    private Boolean isPopular;
    private Boolean isAvailable;
    private String categoryName;
    private String categorySlug;
    private String categoryThemeColor;
}
