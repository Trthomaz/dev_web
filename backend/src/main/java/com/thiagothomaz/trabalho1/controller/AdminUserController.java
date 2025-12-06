package com.thiagothomaz.trabalho1.controller;

import com.thiagothomaz.trabalho1.model.AppUser;
import com.thiagothomaz.trabalho1.model.UserRole;
import com.thiagothomaz.trabalho1.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin/users")
public class AdminUserController {

    private final UserService userService;

    public AdminUserController(UserService userService) {
        this.userService = userService;
    }

    public record CreateUserRequest(String username, String email, String password, String role){}

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody CreateUserRequest req) {
        UserRole role = "ADMIN".equalsIgnoreCase(req.role()) ? UserRole.ADMIN : UserRole.USER;
        AppUser user = userService.createByAdmin(req.username(), req.email(), req.password(), role);
        Map<String, Object> body = new HashMap<>();
        body.put("id", user.getId());
        body.put("username", user.getUsername());
        body.put("role", role.name());
        return ResponseEntity.ok(body);
    }
}
