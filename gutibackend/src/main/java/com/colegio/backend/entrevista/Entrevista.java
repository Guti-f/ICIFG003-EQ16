package com.colegio.backend.entrevista;

import com.colegio.backend.apoderado.Apoderado;
import com.colegio.backend.profesor.Profesor;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "entrevistas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Entrevista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "apoderado_id", nullable = false)
    private Apoderado apoderado;

    @ManyToOne
    @JoinColumn(name = "profesor_id", nullable = false)
    private Profesor profesor;

    @NotNull
    private LocalDateTime fecha;

    @NotBlank
    private String motivo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoEntrevista estado = EstadoEntrevista.PROGRAMADA;

    private String observaciones;
}
