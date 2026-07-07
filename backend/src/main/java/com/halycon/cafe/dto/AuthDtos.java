package com.halycon.cafe.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

public class AuthDtos {

    @Getter @Setter
    public static class SignupRequest {
        @NotBlank private String name;
        @Email @NotBlank private String email;
        private String phone;
        @NotBlank private String password;
    }

    @Getter @Setter
    public static class LoginRequest {
        @Email @NotBlank private String email;
        @NotBlank private String password;
    }

    @Getter @Setter @AllArgsConstructor
    public static class AuthResponse {
        private String token;
        private Long userId;
        private String name;
        private String email;
        private String role;
    }
}
