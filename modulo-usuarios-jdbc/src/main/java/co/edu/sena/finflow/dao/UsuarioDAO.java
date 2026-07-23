package co.edu.sena.finflow.dao;

import co.edu.sena.finflow.config.ConexionBD;
import co.edu.sena.finflow.model.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/** Ejecuta las operaciones CRUD de la tabla usuarios mediante JDBC. */
public class UsuarioDAO {

    private static final String INSERTAR = "INSERT INTO usuarios (documento_identidad, nombres, apellidos, correo_electronico, telefono_contacto) VALUES (?, ?, ?, ?, ?)";
    private static final String CONSULTAR_TODOS = "SELECT id, documento_identidad, nombres, apellidos, correo_electronico, telefono_contacto FROM usuarios ORDER BY id DESC";
    private static final String CONSULTAR_POR_ID = "SELECT id, documento_identidad, nombres, apellidos, correo_electronico, telefono_contacto FROM usuarios WHERE id = ?";
    private static final String EXISTE_DOCUMENTO = "SELECT id FROM usuarios WHERE documento_identidad = ? AND id <> ?";
    private static final String EXISTE_CORREO = "SELECT id FROM usuarios WHERE correo_electronico = ? AND id <> ?";
    private static final String ACTUALIZAR = "UPDATE usuarios SET documento_identidad = ?, nombres = ?, apellidos = ?, correo_electronico = ?, telefono_contacto = ? WHERE id = ?";
    private static final String ELIMINAR = "DELETE FROM usuarios WHERE id = ?";

    public void crear(Usuario usuario) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(INSERTAR)) {
            asignarDatos(sentencia, usuario);
            sentencia.executeUpdate();
        }
    }

    public List<Usuario> listar() throws SQLException {
        List<Usuario> usuarios = new ArrayList<>();
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(CONSULTAR_TODOS);
             ResultSet resultado = sentencia.executeQuery()) {
            while (resultado.next()) {
                usuarios.add(convertirUsuario(resultado));
            }
        }
        return usuarios;
    }

    public Usuario buscarPorId(int id) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(CONSULTAR_POR_ID)) {
            sentencia.setInt(1, id);
            try (ResultSet resultado = sentencia.executeQuery()) {
                return resultado.next() ? convertirUsuario(resultado) : null;
            }
        }
    }

    public boolean existeDatoRepetido(Usuario usuario) throws SQLException {
        return existe(EXISTE_DOCUMENTO, usuario.getDocumentoIdentidad(), usuario.getId())
                || existe(EXISTE_CORREO, usuario.getCorreoElectronico(), usuario.getId());
    }

    public void actualizar(Usuario usuario) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(ACTUALIZAR)) {
            asignarDatos(sentencia, usuario);
            sentencia.setInt(6, usuario.getId());
            sentencia.executeUpdate();
        }
    }

    public void eliminar(int id) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(ELIMINAR)) {
            sentencia.setInt(1, id);
            sentencia.executeUpdate();
        }
    }

    private boolean existe(String consulta, String valor, int id) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(consulta)) {
            sentencia.setString(1, valor);
            sentencia.setInt(2, id);
            try (ResultSet resultado = sentencia.executeQuery()) {
                return resultado.next();
            }
        }
    }

    private void asignarDatos(PreparedStatement sentencia, Usuario usuario) throws SQLException {
        sentencia.setString(1, usuario.getDocumentoIdentidad());
        sentencia.setString(2, usuario.getNombres());
        sentencia.setString(3, usuario.getApellidos());
        sentencia.setString(4, usuario.getCorreoElectronico());
        sentencia.setString(5, usuario.getTelefonoContacto());
    }

    private Usuario convertirUsuario(ResultSet resultado) throws SQLException {
        Usuario usuario = new Usuario();
        usuario.setId(resultado.getInt("id"));
        usuario.setDocumentoIdentidad(resultado.getString("documento_identidad"));
        usuario.setNombres(resultado.getString("nombres"));
        usuario.setApellidos(resultado.getString("apellidos"));
        usuario.setCorreoElectronico(resultado.getString("correo_electronico"));
        usuario.setTelefonoContacto(resultado.getString("telefono_contacto"));
        return usuario;
    }
}
