package com.halycon.cafe.util;

import com.halycon.cafe.model.User;
import com.halycon.cafe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthUtil {

    private final UserRepository userRepository;

    /** Resolves the currently authenticated user's ID from the JWT-populated SecurityContext. */
    public Long currentUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));
        return user.getId();
    }
}
