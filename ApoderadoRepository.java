package com.colegio.backend.auth;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;

    public DataInitializer(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public void run(String... args) {
        if (usuarioRepository.count() == 0) {
            usuarioRepository.save(new Usuario(null, "admin", "admin123", "Administrador"));
            usuarioRepository.save(new Usuario(null, "gustavo", "1234", "Gustavo Fernández"));
            System.out.println("✅ Usuarios iniciales creados.");
        }
    }
}
