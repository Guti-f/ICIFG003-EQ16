package com.colegio.backend.apoderado;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apoderados")
public class ApoderadoController {

    private final ApoderadoRepository repository;

    public ApoderadoController(ApoderadoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Apoderado> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Apoderado> obtener(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Apoderado crear(@Valid @RequestBody Apoderado apoderado) {
        return repository.save(apoderado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Apoderado> actualizar(@PathVariable Long id,
                                                 @Valid @RequestBody Apoderado datos) {
        return repository.findById(id).map(a -> {
            a.setRut(datos.getRut());
            a.setNombre(datos.getNombre());
            a.setApellido(datos.getApellido());
            a.setTelefono(datos.getTelefono());
            a.setEmail(datos.getEmail());
            a.setRelacion(datos.getRelacion());
            return ResponseEntity.ok(repository.save(a));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
