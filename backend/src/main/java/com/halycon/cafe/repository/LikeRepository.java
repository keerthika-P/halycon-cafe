package com.halycon.cafe.repository;

import com.halycon.cafe.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByUserId(Long userId);
    Optional<Like> findByUserIdAndMenuItemId(Long userId, Long menuItemId);
    void deleteByUserIdAndMenuItemId(Long userId, Long menuItemId);
}
