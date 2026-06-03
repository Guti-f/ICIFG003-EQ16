package com.colegio.backend.entrevista;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class EntrevistaRequest {

    @NotNull
    private Long apoderadoId;

    @NotNull
    private Long profesorId;

    @NotNull
    private LocalDateTime fecha;

    @NotBlank
    private String motivo;

    private EstadoEntrevista estado;

    private String observaciones;

    public Long getApoderadoId() { return apoderadoId; }
    public void setApoderadoId(Long apoderadoId) { this.apoderadoId = apoderadoId; }

    public Long getProfesorId() { return profesorId; }
    public void setProfesorId(Long profesorId) { this.profesorId = profesorId; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }

    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }

    public EstadoEntrevista getEstado() { return estado; }
    public void setEstado(EstadoEntrevista estado) { this.estado = estado; }

    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
}
