package com.colegio.backend.entrevista;

import com.colegio.backend.apoderado.ApoderadoRepository;
import com.colegio.backend.profesor.ProfesorRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entrevistas")
public class EntrevistaController {

    private final EntrevistaRepository entrevistaRepository;
    private final ApoderadoRepository apoderadoRepository;
    private final ProfesorRepository profesorRepository;

    public EntrevistaController(EntrevistaRepository entrevistaRepository,
                                 ApoderadoRepository apoderadoRepository,
                                 ProfesorRepository profesorRepository) {
        this.entrevistaRepository = entrevistaRepository;
        this.apoderadoRepository = apoderadoRepository;
        this.profesorRepository = profesorRepository;
    }

    @GetMapping
    public List<Entrevista> listar() {
        return entrevistaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Entrevista> obtener(@PathVariable Long id) {
        return entrevistaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody EntrevistaRequest request) {
        var apoderado = apoderadoRepository.findById(request.getApoderadoId());
        var profesor = profesorRepository.findById(request.getProfesorId());

        if (apoderado.isEmpty()) return ResponseEntity.badRequest().body("Apoderado no encontrado");
        if (profesor.isEmpty()) return ResponseEntity.badRequest().body("Profesor no encontrado");

        Entrevista e = new Entrevista();
        e.setApoderado(apoderado.get());
        e.setProfesor(profesor.get());
        e.setFecha(request.getFecha());
        e.setMotivo(request.getMotivo());
        e.setEstado(request.getEstado() != null ? request.getEstado() : EstadoEntrevista.PROGRAMADA);
        e.setObservaciones(request.getObservaciones());

        return ResponseEntity.ok(entrevistaRepository.save(e));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id,
                                         @Valid @RequestBody EntrevistaRequest request) {
        return entrevistaRepository.findById(id).map(e -> {
            var apoderado = apoderadoRepository.findById(request.getApoderadoId());
            var profesor = profesorRepository.findById(request.getProfesorId());

            if (apoderado.isEmpty()) return ResponseEntity.badRequest().body("Apoderado no encontrado");
            if (profesor.isEmpty()) return ResponseEntity.badRequest().body("Profesor no encontrado");

            e.setApoderado(apoderado.get());
            e.setProfesor(profesor.get());
            e.setFecha(request.getFecha());
            e.setMotivo(request.getMotivo());
            e.setEstado(request.getEstado() != null ? request.getEstado() : e.getEstado());
            e.setObservaciones(request.getObservaciones());

            return ResponseEntity.ok(entrevistaRepository.save(e));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!entrevistaRepository.existsById(id)) return ResponseEntity.notFound().build();
        entrevistaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
