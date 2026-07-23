# Módulo de usuarios con JDBC y Servlet

Evidencia: **GA7-220501096-AA2-EV01 – Codificación de módulos del software**.

Este módulo corresponde a Finflow y permite administrar el registro de usuarios solicitado: documento de identidad, nombres, apellidos, correo electrónico y teléfono de contacto. Implementa las cuatro operaciones CRUD mediante un Servlet y JDBC con MySQL. También impide guardar documentos o correos repetidos.

## Estructura y estándares aplicados

- `model/Usuario.java`: clase del dominio. Las clases usan PascalCase.
- `dao/UsuarioDAO.java`: acceso a datos y consultas SQL parametrizadas con `PreparedStatement`.
- `controller/UsuarioServlet.java`: recibe las acciones del formulario.
- `config/ConexionBD.java`: centraliza la conexión JDBC.
- Los paquetes están en minúscula y los métodos/variables usan camelCase.

## Paso a paso para ejecutar la evidencia

1. Instala **JDK 17 o superior**, **Apache Maven**, **MySQL** y **Apache Tomcat 10.1 o superior**. Se usa Tomcat 10 porque el código importa `jakarta.servlet`.
2. En MySQL Workbench crea la base de datos: abre el archivo `database/finflow.sql` y ejecuta todo su contenido. Se creará la base `finflow`, la tabla `usuarios` y un registro de prueba.
3. Abre `src/main/java/co/edu/sena/finflow/config/ConexionBD.java`. Cambia `USUARIO` y `CLAVE` si tu instalación de MySQL no usa `root` sin contraseña. No cambies la URL a menos que tu MySQL use otro puerto o nombre de base de datos.
4. Abre una terminal en la carpeta `modulo-usuarios-jdbc` y ejecuta `mvn clean package`. Al finalizar se genera `target/modulo-usuarios-jdbc.war`.
5. Copia ese archivo `.war` en la carpeta `webapps` de Tomcat e inicia Tomcat. En el navegador abre `http://localhost:8080/modulo-usuarios-jdbc/`.
6. Registra un usuario. Luego intenta registrar el mismo documento o correo: debe aparecer el mensaje de dato repetido. Usa los botones **Editar** y **Eliminar** para probar las otras dos operaciones.

## Evidencia de las funcionalidades

| Requisito | Cómo se evidencia |
|---|---|
| Inserción | Botón “Registrar usuario”; método `crear`. |
| Consulta | Tabla “Usuarios registrados”; método `listar`. |
| Actualización | Botón “Editar”; método `actualizar`. |
| Eliminación | Botón “Eliminar”; método `eliminar`. |
| JDBC | `ConexionBD` usa `DriverManager` y `UsuarioDAO` usa `Connection`, `PreparedStatement` y `ResultSet`. |
| Datos repetidos | `existeDatoRepetido` compara documento y correo antes de insertar o actualizar. |

## Control de versiones

El proyecto ya está inicializado como repositorio Git. Para dejar tu avance guardado ejecuta:

```text
git add .
git commit -m "Implementa módulo de usuarios con JDBC y Servlet"
git push github main
```

El enlace que debes incluir en la entrega se encuentra en el archivo `ENLACE_REPOSITORIO.txt` de la carpeta principal.

## Capturas recomendadas para el instructor

1. MySQL Workbench mostrando la tabla `usuarios` con registros.
2. Formulario con un usuario registrado y la tabla de resultados.
3. Mensaje al intentar repetir documento o correo.
4. Código de `UsuarioDAO.java` y `UsuarioServlet.java`.
5. Historial de Git o página del repositorio mostrando el commit.
