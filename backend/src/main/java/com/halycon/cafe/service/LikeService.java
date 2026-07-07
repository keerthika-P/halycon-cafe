package com.halycon.cafe.service;

import com.halycon.cafe.dto.MenuItemResponse;
import com.halycon.cafe.model.Like;
import com.halycon.cafe.model.MenuItem;
import com.halycon.cafe.model.User;
import com.halycon.cafe.repository.LikeRepository;
import com.halycon.cafe.repository.MenuItemRepository;
import com.halycon.cafe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;
    private final MenuService menuService;

    @Transactional
    public void like(Long userId, Long menuItemId) {
        if (likeRepository.findByUserIdAndMenuItemId(userId, menuItemId).isPresent()) return;
        User user = userRepository.getReferenceById(userId);
        MenuItem item = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new IllegalArgumentException("Menu item not found"));
        likeRepository.save(Like.builder().user(user).menuItem(item).build());
    }

    @Transactional
    public void unlike(Long userId, Long menuItemId) {
        likeRepository.deleteByUserIdAndMenuItemId(userId, menuItemId);
    }

    @Transactional(readOnly = true)
    public List<MenuItemResponse> getLikedItems(Long userId) {
        return likeRepository.findByUserId(userId).stream()
                .map(l -> l.getMenuItem().getId())
                .map(id -> menuService.getAll().stream().filter(m -> m.getId().equals(id)).findFirst().orElse(null))
                .filter(java.util.Objects::nonNull)
                .collect(Collectors.toList());
    }
}
