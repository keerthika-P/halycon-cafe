package com.halycon.cafe.service;

import com.halycon.cafe.dto.AuthDtos.*;
import com.halycon.cafe.model.User;
import com.halycon.cafe.repository.UserRepository;
import com.halycon.cafe.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final org.springframework.security.core.userdetails.UserDetailsService userDetailsService;

    public AuthResponse signup(SignupRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("An account with this email already exists.");
        }
        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .phone(req.getPhone())
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .role(User.Role.CUSTOMER)
                .build();
        userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtService.generateToken(userDetails);
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole().name());
    }

    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials."));

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtService.generateToken(userDetails);
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole().name());
    }
}
