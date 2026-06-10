package com.colegio.backend.entrevista;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entrevistas")
public class EntrevistaController {

    private final EntrevistaRepository repo;

    public EntrevistaController(EntrevistaRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Entrevista> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Entrevista> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Entrevista create(@RequestBody @Valid Entrevista entrevista) {
        return repo.save(entrevista);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Entrevista> update(@PathVariable Long id, @RequestBody @Valid Entrevista entrevista) {
        return repo.findById(id)
                .map(existing -> {
                    entrevista.setId(id);
                    return ResponseEntity.ok(repo.save(entrevista));
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
