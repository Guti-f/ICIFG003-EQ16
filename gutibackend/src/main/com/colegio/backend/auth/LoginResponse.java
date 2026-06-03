package com.colegio.backend.auth;

public class LoginResponse {
    private boolean success;
    private String mensaje;
    private String username;
    private String nombre;

    public LoginResponse(boolean success, String mensaje, String username, String nombre) {
        this.success = success;
        this.mensaje = mensaje;
        this.username = username;
        this.nombre = nombre;
    }

    public boolean isSuccess() { return success; }
    public String getMensaje() { return mensaje; }
    public String getUsername() { return username; }
    public String getNombre() { return nombre; }
}
