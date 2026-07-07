package com.halycon.cafe.controller;

import com.halycon.cafe.dto.MenuItemResponse;
import com.halycon.cafe.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @GetMapping
    public List<MenuItemResponse> getAll() {
        return menuService.getAll();
    }

    @GetMapping("/category/{categoryId}")
    public List<MenuItemResponse> getByCategory(@PathVariable Long categoryId) {
        return menuService.getByCategory(categoryId);
    }

    @GetMapping("/search")
    public List<MenuItemResponse> search(@RequestParam String q) {
        return menuService.search(q);
    }

    @GetMapping("/trending")
    public List<MenuItemResponse> trending() {
        return menuService.trending();
    }

    @GetMapping("/popular")
    public List<MenuItemResponse> popular() {
        return menuService.popular();
    }
}
