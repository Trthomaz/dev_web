package com.thiagothomaz.trabalho1.service;

import com.thiagothomaz.trabalho1.model.AppUser;
import com.thiagothomaz.trabalho1.model.UserRole;
import com.thiagothomaz.trabalho1.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AppUser signup(String username, String rawPassword) {
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Usuário já existe");
        }
        String hashed = passwordEncoder.encode(rawPassword);
        AppUser user = new AppUser(username, hashed, Set.of(UserRole.USER));
        return userRepository.save(user);
    }

    public AppUser createByAdmin(String username, String rawPassword, UserRole role) {
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Usuário já existe");
        }
        String hashed = passwordEncoder.encode(rawPassword);
        AppUser user = new AppUser(username, hashed, Set.of(role));
        return userRepository.save(user);
    }
}
