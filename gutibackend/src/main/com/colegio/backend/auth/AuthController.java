package com.colegio.backend.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return usuarioRepository.findByUsername(request.getUsername())
                .filter(u -> u.getPassword().equals(request.getPassword()))
                .map(u -> ResponseEntity.ok(
                        new LoginResponse(true, "Login exitoso", u.getUsername(), u.getNombre())))
                .orElse(ResponseEntity.status(401).body(
                        new LoginResponse(false, "Usuario o contraseña incorrectos", null, null)));
    }
}
