package com.halycon.cafe.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;

public class CartDtos {

    @Getter @Setter
    public static class AddToCartRequest {
        private Long menuItemId;
        private Integer quantity;
    }

    @Getter @Setter @Builder
    public static class CartItemResponse {
        private Long cartItemId;
        private Long menuItemId;
        private String name;
        private String imageUrl;
        private BigDecimal price;
        private Integer quantity;
        private BigDecimal subtotal;
    }

    @Getter @Setter @Builder
    public static class CartResponse {
        private List<CartItemResponse> items;
        private BigDecimal total;
    }
}
