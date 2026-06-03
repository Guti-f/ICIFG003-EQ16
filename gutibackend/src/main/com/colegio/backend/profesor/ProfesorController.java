package com.colegio.backend.profesor;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profesores")
public class ProfesorController {

    private final ProfesorRepository repository;

    public ProfesorController(ProfesorRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Profesor> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profesor> obtener(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Profesor crear(@Valid @RequestBody Profesor profesor) {
        return repository.save(profesor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profesor> actualizar(@PathVariable Long id,
                                                @Valid @RequestBody Profesor datos) {
        return repository.findById(id).map(p -> {
            p.setRut(datos.getRut());
            p.setNombre(datos.getNombre());
            p.setApellido(datos.getApellido());
            p.setEmail(datos.getEmail());
            p.setTelefono(datos.getTelefono());
            p.setAsignatura(datos.getAsignatura());
            return ResponseEntity.ok(repository.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
