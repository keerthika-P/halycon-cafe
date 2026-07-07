package com.halycon.cafe.repository;

import com.halycon.cafe.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
