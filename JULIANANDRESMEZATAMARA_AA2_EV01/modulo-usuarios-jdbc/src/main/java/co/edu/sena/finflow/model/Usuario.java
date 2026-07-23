package co.edu.sena.finflow.model;

/** Representa la información de un usuario registrada en Finflow. */
public class Usuario {

    private int id;
    private String documentoIdentidad;
    private String nombres;
    private String apellidos;
    private String correoElectronico;
    private String telefonoContacto;

    public Usuario() {
    }

    public Usuario(String documentoIdentidad, String nombres, String apellidos,
                   String correoElectronico, String telefonoContacto) {
        this.documentoIdentidad = documentoIdentidad;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.correoElectronico = correoElectronico;
        this.telefonoContacto = telefonoContacto;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getDocumentoIdentidad() { return documentoIdentidad; }
    public void setDocumentoIdentidad(String documentoIdentidad) { this.documentoIdentidad = documentoIdentidad; }
    public String getNombres() { return nombres; }
    public void setNombres(String nombres) { this.nombres = nombres; }
    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }
    public String getCorreoElectronico() { return correoElectronico; }
    public void setCorreoElectronico(String correoElectronico) { this.correoElectronico = correoElectronico; }
    public String getTelefonoContacto() { return telefonoContacto; }
    public void setTelefonoContacto(String telefonoContacto) { this.telefonoContacto = telefonoContacto; }
}
