<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.List" %>
<%@ page import="co.edu.sena.finflow.model.Usuario" %>
<%
    List<Usuario> usuarios = (List<Usuario>) request.getAttribute("usuarios");
    Usuario usuarioEdicion = (Usuario) request.getAttribute("usuarioEdicion");
    String mensaje = request.getParameter("mensaje");
    boolean editando = usuarioEdicion != null;
%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Finflow | Registro de usuarios</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 1050px; margin: 30px auto; padding: 0 18px; color: #1f2937; }
        h1 { color: #0f766e; } form { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; padding: 20px; background: #f0fdfa; border-radius: 8px; }
        label { display: grid; gap: 6px; font-weight: bold; } input { padding: 9px; border: 1px solid #94a3b8; border-radius: 4px; }
        .acciones, .mensaje { grid-column: 1 / -1; } button, .enlace { padding: 9px 14px; border: 0; border-radius: 4px; background: #0f766e; color: white; text-decoration: none; cursor: pointer; }
        table { width: 100%; border-collapse: collapse; margin-top: 25px; } th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; } th { background: #0f766e; color: white; }
        .mensaje { background: #dcfce7; padding: 10px; color: #166534; } .eliminar { background: #b91c1c; } .acciones-form { display: flex; gap: 5px; }
    </style>
</head>
<body>
    <h1>Registro de usuarios - Finflow</h1>
    <p>Este formulario permite crear, consultar, editar y eliminar usuarios con conexión JDBC a MySQL.</p>
    <% if (mensaje != null) { %><p class="mensaje"><%= mensaje %></p><% } %>

    <form action="usuarios" method="post">
        <input type="hidden" name="accion" value="<%= editando ? "actualizar" : "crear" %>">
        <input type="hidden" name="id" value="<%= editando ? usuarioEdicion.getId() : "" %>">
        <label>Documento de identidad<input name="documentoIdentidad" required maxlength="20" value="<%= editando ? usuarioEdicion.getDocumentoIdentidad() : "" %>"></label>
        <label>Nombres<input name="nombres" required maxlength="80" value="<%= editando ? usuarioEdicion.getNombres() : "" %>"></label>
        <label>Apellidos<input name="apellidos" required maxlength="80" value="<%= editando ? usuarioEdicion.getApellidos() : "" %>"></label>
        <label>Correo electrónico<input type="email" name="correoElectronico" required maxlength="120" value="<%= editando ? usuarioEdicion.getCorreoElectronico() : "" %>"></label>
        <label>Teléfono de contacto<input name="telefonoContacto" required maxlength="20" value="<%= editando ? usuarioEdicion.getTelefonoContacto() : "" %>"></label>
        <p class="acciones"><button type="submit"><%= editando ? "Actualizar usuario" : "Registrar usuario" %></button><% if (editando) { %> <a class="enlace" href="usuarios">Cancelar edición</a><% } %></p>
    </form>

    <h2>Usuarios registrados</h2>
    <table>
        <thead><tr><th>Documento</th><th>Nombres</th><th>Apellidos</th><th>Correo</th><th>Teléfono</th><th>Acciones</th></tr></thead>
        <tbody>
        <% if (usuarios != null) for (Usuario usuario : usuarios) { %>
            <tr><td><%= usuario.getDocumentoIdentidad() %></td><td><%= usuario.getNombres() %></td><td><%= usuario.getApellidos() %></td><td><%= usuario.getCorreoElectronico() %></td><td><%= usuario.getTelefonoContacto() %></td>
                <td><div class="acciones-form"><a class="enlace" href="usuarios?id=<%= usuario.getId() %>">Editar</a><form action="usuarios" method="post" onsubmit="return confirm('¿Desea eliminar este usuario?');"><input type="hidden" name="accion" value="eliminar"><input type="hidden" name="id" value="<%= usuario.getId() %>"><button class="eliminar" type="submit">Eliminar</button></form></div></td></tr>
        <% } %>
        </tbody>
    </table>
</body>
</html>
