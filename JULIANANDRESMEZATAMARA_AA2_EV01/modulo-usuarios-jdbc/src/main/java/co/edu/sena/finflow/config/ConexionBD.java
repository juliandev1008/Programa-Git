package co.edu.sena.finflow.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/** Administra la conexión JDBC con la base de datos MySQL. */
public final class ConexionBD {

    private static final String URL = "jdbc:mysql://localhost:3306/finflow?useSSL=false&serverTimezone=America/Bogota";
    private static final String USUARIO = "root";
    private static final String CLAVE = "";

    private ConexionBD() {
    }

    public static Connection obtenerConexion() throws SQLException {
        return DriverManager.getConnection(URL, USUARIO, CLAVE);
    }
}
