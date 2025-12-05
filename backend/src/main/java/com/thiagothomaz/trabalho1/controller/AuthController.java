package com.thiagothomaz.trabalho1.controller;

import com.thiagothomaz.trabalho1.model.AppUser;
import com.thiagothomaz.trabalho1.security.JwtService;
import com.thiagothomaz.trabalho1.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    public record AuthRequest(String username, String password) {}
    public record AuthResponse(String token, String username, String role) {}

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest req) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.username(),
                req.password()));
        String username = auth.getName();
        String role = auth.getAuthorities().stream().findFirst().map(a -> a.getAuthority()).orElse("ROLE_USER");
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        String token = jwtService.generateToken(username, claims);
        return ResponseEntity.ok(new AuthResponse(token, username, role));
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody AuthRequest req) {
        AppUser user = userService.signup(req.username(), req.password());
        Map<String, Object> body = new HashMap<>();
        body.put("id", user.getId());
        body.put("username", user.getUsername());
        body.put("role", "ROLE_USER");
        return ResponseEntity.ok(body);
    }
}
