# Guía sencilla para desarrollar y sustentar la evidencia

## 1. ¿Qué te están pidiendo?

Debes entregar una parte funcional del proyecto Finflow. En este caso se desarrolló el **módulo de registro de usuarios**. No es necesario explicar todo el sistema: debes demostrar que este módulo guarda datos en una base de datos y permite crear, consultar, actualizar y eliminar registros.

La aplicación funciona así:

```text
Persona llena el formulario → UsuarioServlet recibe los datos → UsuarioDAO usa JDBC → MySQL guarda o consulta la información
```

## 2. Qué contiene esta carpeta

| Elemento | Para qué sirve |
|---|---|
| `src/main/webapp/usuarios.jsp` | Formulario que ve la persona usuaria y tabla de registros. |
| `UsuarioServlet.java` | Recibe los botones Registrar, Editar y Eliminar. |
| `UsuarioDAO.java` | Contiene las instrucciones para insertar, consultar, actualizar y eliminar en MySQL. |
| `ConexionBD.java` | Abre la conexión JDBC con MySQL. |
| `database/finflow.sql` | Crea la base de datos y tabla necesarias. |
| `pom.xml` | Declara las librerías del proyecto: Servlet y conector MySQL. |

## 3. Relación con los artefactos del ciclo de software

Si ya realizaste artefactos anteriores, relaciónalos de esta manera en tu sustentación:

- **Historia de usuario:** como administrador quiero registrar usuarios con sus datos de contacto para gestionarlos dentro de Finflow.
- **Caso de uso:** gestionar usuarios. Actor: administrador. Acciones: registrar, consultar, editar y eliminar.
- **Diagrama de clases:** la clase `Usuario` representa la entidad; `UsuarioDAO` se encarga de persistirla; `UsuarioServlet` controla la interacción.
- **Prototipo:** el archivo `usuarios.jsp` materializa la pantalla de registro diseñada.
- **Plan de trabajo y tecnologías:** Java, Jakarta Servlet, JDBC, MySQL, Maven, Tomcat y Git.

## 4. Instalación, sin saltarse pasos

1. Descarga e instala MySQL Workbench y MySQL Server. Durante la instalación crea o guarda la contraseña del usuario `root`.
2. Instala Apache Tomcat 10.1 y JDK 17 o posterior. También instala Maven, que permite descargar las librerías y empacar el proyecto.
3. Abre MySQL Workbench, conecta con tu servidor y abre el archivo `database/finflow.sql`. Pulsa el botón del rayo para ejecutarlo.
4. En `ConexionBD.java` escribe tu contraseña donde dice `CLAVE`. Si usas otro usuario de MySQL, cambia también `USUARIO`.
5. En la carpeta del módulo abre la terminal y ejecuta `mvn clean package`.
6. Busca el archivo generado en `target/modulo-usuarios-jdbc.war`. Cópialo a `webapps` dentro de la instalación de Tomcat.
7. Inicia Tomcat y visita `http://localhost:8080/modulo-usuarios-jdbc/`.

## 5. Prueba que debes realizar

Usa un dato diferente al de prueba, por ejemplo documento `1000000002`, nombre `Ana`, apellidos `Gómez`, correo `ana.gomez@correo.com` y teléfono `3000000002`.

1. Regístralo y toma una captura del mensaje de éxito y la tabla: esta es la **inserción y consulta**.
2. Pulsa **Editar**, cambia el teléfono y guarda: captura el resultado, esta es la **actualización**.
3. Intenta crear otro usuario con el mismo documento o correo: captura el mensaje, esta es la **validación de repetidos**.
4. Pulsa **Eliminar**, confirma y captura la tabla: esta es la **eliminación**.
5. En Workbench ejecuta `SELECT * FROM finflow.usuarios;` y toma una captura. Esta demuestra que los datos sí llegaron a MySQL por JDBC.

## 6. Qué decir al sustentar

“Este es el módulo de usuarios de Finflow. El formulario recibe documento, nombres, apellidos, correo y teléfono. El Servlet procesa la solicitud y llama al DAO. El DAO usa JDBC y consultas preparadas para comunicarse con MySQL. Implementé crear, listar, actualizar y eliminar. Antes de guardar se consulta si el documento o correo ya existen, por lo que se evita duplicar información. El proyecto está versionado con Git y el enlace del repositorio va incluido en la entrega.”

## 7. Entrega final

1. Sube los cambios al repositorio con Git.
2. Coloca las capturas que tomaste en una carpeta llamada `capturas` dentro de la carpeta de evidencia, si tu instructor las solicita.
3. Comprime la carpeta `JULIANMEZA_AA2_EV01` como archivo ZIP.
4. Entrega el archivo `JULIANMEZA_AA2_EV01.zip`. Dentro estarán los archivos del proyecto y `ENLACE_REPOSITORIO.txt`.
