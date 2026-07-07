package com.halycon.cafe.repository;

import com.halycon.cafe.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByCategoryId(Long categoryId);
    List<MenuItem> findByNameContainingIgnoreCase(String query);
    List<MenuItem> findByIsTrendingTrue();
    List<MenuItem> findByIsPopularTrue();
    List<MenuItem> findByIsVeg(Boolean isVeg);
}
