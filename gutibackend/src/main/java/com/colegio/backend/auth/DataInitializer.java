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
            Usuario admin = new Usuario();
            admin.setUsername("admin");
            admin.setPassword("admin123");
            admin.setNombre("Administrador");
            usuarioRepository.save(admin);

            Usuario lucas = new Usuario();
            lucas.setUsername("lucas");
            lucas.setPassword("1234");
            lucas.setNombre("Lucas Chong");
            usuarioRepository.save(lucas);

            Usuario gustavo = new Usuario();
            gustavo.setUsername("gustavo");
            gustavo.setPassword("1234");
            gustavo.setNombre("Gustavo Fernandez");
            usuarioRepository.save(gustavo);

            System.out.println(">>> Usuarios iniciales creados");
        }
    }
}
