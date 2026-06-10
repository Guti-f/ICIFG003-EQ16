package com.colegio.backend.apoderado;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apoderados")
public class ApoderadoController {

    private final ApoderadoRepository repo;

    public ApoderadoController(ApoderadoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Apoderado> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Apoderado> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Apoderado create(@RequestBody @Valid Apoderado apoderado) {
        return repo.save(apoderado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Apoderado> update(@PathVariable Long id, @RequestBody @Valid Apoderado apoderado) {
        return repo.findById(id)
                .map(existing -> {
                    apoderado.setId(id);
                    return ResponseEntity.ok(repo.save(apoderado));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
