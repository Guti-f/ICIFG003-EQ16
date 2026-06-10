package com.colegio.backend.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuario = usuarioRepository.findByUsername(request.getUsername());

        if (usuario.isPresent() && usuario.get().getPassword().equals(request.getPassword())) {
            Usuario u = usuario.get();
            return ResponseEntity.ok(Map.of(
                "id", u.getId(),
                "username", u.getUsername(),
                "nombre", u.getNombre()
            ));
        }

        return ResponseEntity.status(401).body(Map.of("error", "Credenciales invalidas"));
    }
}
