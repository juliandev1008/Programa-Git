package co.edu.sena.finflow.controller;

import co.edu.sena.finflow.dao.UsuarioDAO;
import co.edu.sena.finflow.model.Usuario;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

/** Recibe las solicitudes del formulario y coordina el CRUD de usuarios. */
@WebServlet("/usuarios")
public class UsuarioServlet extends HttpServlet {

    private final UsuarioDAO usuarioDAO = new UsuarioDAO();

    @Override
    protected void doGet(HttpServletRequest solicitud, HttpServletResponse respuesta)
            throws ServletException, IOException {
        try {
            solicitud.setAttribute("usuarios", usuarioDAO.listar());
            String id = solicitud.getParameter("id");
            if (id != null && !id.isBlank()) {
                solicitud.setAttribute("usuarioEdicion", usuarioDAO.buscarPorId(Integer.parseInt(id)));
            }
            solicitud.getRequestDispatcher("/usuarios.jsp").forward(solicitud, respuesta);
        } catch (SQLException | NumberFormatException error) {
            lanzarError(solicitud, respuesta, error);
        }
    }

    @Override
    protected void doPost(HttpServletRequest solicitud, HttpServletResponse respuesta)
            throws ServletException, IOException {
        solicitud.setCharacterEncoding("UTF-8");
        String accion = solicitud.getParameter("accion");
        try {
            if ("eliminar".equals(accion)) {
                usuarioDAO.eliminar(Integer.parseInt(solicitud.getParameter("id")));
                redirigir(respuesta, "Usuario eliminado correctamente.");
                return;
            }
            Usuario usuario = construirUsuario(solicitud);
            if (usuarioDAO.existeDatoRepetido(usuario)) {
                redirigir(respuesta, "No se puede guardar: el documento o correo ya está registrado.");
                return;
            }
            if ("actualizar".equals(accion)) {
                usuarioDAO.actualizar(usuario);
                redirigir(respuesta, "Usuario actualizado correctamente.");
            } else {
                usuarioDAO.crear(usuario);
                redirigir(respuesta, "Usuario registrado correctamente.");
            }
        } catch (SQLException | NumberFormatException error) {
            lanzarError(solicitud, respuesta, error);
        }
    }

    private Usuario construirUsuario(HttpServletRequest solicitud) {
        Usuario usuario = new Usuario(
                solicitud.getParameter("documentoIdentidad").trim(),
                solicitud.getParameter("nombres").trim(),
                solicitud.getParameter("apellidos").trim(),
                solicitud.getParameter("correoElectronico").trim(),
                solicitud.getParameter("telefonoContacto").trim());
        String id = solicitud.getParameter("id");
        if (id != null && !id.isBlank()) {
            usuario.setId(Integer.parseInt(id));
        }
        return usuario;
    }

    private void redirigir(HttpServletResponse respuesta, String mensaje) throws IOException {
        respuesta.sendRedirect("usuarios?mensaje=" + java.net.URLEncoder.encode(mensaje, java.nio.charset.StandardCharsets.UTF_8));
    }

    private void lanzarError(HttpServletRequest solicitud, HttpServletResponse respuesta, Exception error)
            throws ServletException, IOException {
        throw new ServletException("No fue posible completar la operación de usuarios.", error);
    }
}
