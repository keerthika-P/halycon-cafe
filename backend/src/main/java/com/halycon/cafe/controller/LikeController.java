package com.halycon.cafe.controller;

import com.halycon.cafe.dto.MenuItemResponse;
import com.halycon.cafe.service.LikeService;
import com.halycon.cafe.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;
    private final AuthUtil authUtil;

    @GetMapping
    public List<MenuItemResponse> getLiked() {
        return likeService.getLikedItems(authUtil.currentUserId());
    }

    @PostMapping("/{menuItemId}")
    public void like(@PathVariable Long menuItemId) {
        likeService.like(authUtil.currentUserId(), menuItemId);
    }

    @DeleteMapping("/{menuItemId}")
    public void unlike(@PathVariable Long menuItemId) {
        likeService.unlike(authUtil.currentUserId(), menuItemId);
    }
}
