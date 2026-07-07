package com.halycon.cafe.service;

import com.halycon.cafe.dto.MenuItemResponse;
import com.halycon.cafe.model.MenuItem;
import com.halycon.cafe.repository.MenuItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuItemRepository menuItemRepository;

    public List<MenuItemResponse> getAll() {
        return menuItemRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<MenuItemResponse> getByCategory(Long categoryId) {
        return menuItemRepository.findByCategoryId(categoryId).stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<MenuItemResponse> search(String query) {
        return menuItemRepository.findByNameContainingIgnoreCase(query).stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<MenuItemResponse> trending() {
        return menuItemRepository.findByIsTrendingTrue().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<MenuItemResponse> popular() {
        return menuItemRepository.findByIsPopularTrue().stream().map(this::toResponse).collect(Collectors.toList());
    }

    private MenuItemResponse toResponse(MenuItem item) {
        return MenuItemResponse.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .ingredients(item.getIngredients())
                .price(item.getPrice())
                .calories(item.getCalories())
                .rating(item.getRating())
                .imageUrl(item.getImageUrl())
                .isVeg(item.getIsVeg())
                .isTrending(item.getIsTrending())
                .isChefSpecial(item.getIsChefSpecial())
                .isPopular(item.getIsPopular())
                .isAvailable(item.getIsAvailable())
                .categoryName(item.getCategory().getName())
                .categorySlug(item.getCategory().getSlug())
                .categoryThemeColor(item.getCategory().getThemeColor())
                .build();
    }
}
