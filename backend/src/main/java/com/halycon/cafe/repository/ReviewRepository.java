package com.halycon.cafe.repository;

import com.halycon.cafe.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByMenuItemId(Long menuItemId);
}
