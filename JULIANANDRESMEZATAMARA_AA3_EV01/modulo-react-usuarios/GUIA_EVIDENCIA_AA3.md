# Guía para elaborar y sustentar la evidencia AA3-EV01

## Qué se desarrolló

Se escogió la alternativa **web**. Se implementó con React el módulo “Gestión de usuarios” de Finflow. React es un framework o biblioteca para crear interfaces web mediante componentes. En este caso, `App.jsx` es el componente principal y `Campo` es un componente reutilizable para los controles del formulario.

## Qué hace la aplicación

| Requisito funcional | Dónde se cumple |
|---|---|
| Registrar usuario | Formulario y función `guardarUsuario`. |
| Consultar usuarios | Tabla construida con `usuarios.map`. |
| Actualizar usuario | Botón Editar y función `editarUsuario`. |
| Eliminar usuario | Botón Eliminar y función `eliminarUsuario`. |
| Validar repetidos | Variable `repetido` en `guardarUsuario`. |
| Interfaz React | Componentes `App` y `Campo`, archivos `.jsx`. |

## Cómo mostrarla al instructor

1. Ejecuta el proyecto siguiendo el README.
2. Muestra el formulario y explica que los datos se guardan temporalmente en el estado de React con `useState`.
3. Registra un usuario nuevo. Esto muestra la inserción y la consulta en la tabla.
4. Pulsa Editar, cambia el teléfono y guarda. Esto muestra la actualización.
5. Registra un dato repetido; aparecerá la validación.
6. Elimina un usuario y confirma el mensaje. Esto muestra la eliminación.
7. Abre el PDF `CODIGO_JSX_COMENTADO_AA3_EV01.pdf`: allí está el componente JSX con explicación de cada línea.
8. Abre el repositorio GitHub y muestra el commit donde se agregó esta evidencia.

## Texto corto para la sustentación

“Desarrollé un módulo web de Finflow con React. El componente principal se llama App y utiliza useState para administrar los usuarios, el formulario y los mensajes. El usuario puede registrarse, verse en la tabla, editarse y eliminarse. Antes de guardar, la aplicación valida que no existan documentos ni correos repetidos. Usé JSX, componentes reutilizables, estilos CSS y Git para versionar el código. El código está comentado y su explicación línea a línea está en el PDF adjunto.”

## Entrega

La carpeta comprimida se llama `JULIANANDRESMEZATAMARA_AA3_EV01.zip`. Incluye el proyecto React, el PDF del JSX explicado, esta guía y el archivo con el enlace del repositorio. Antes de entregar, puedes cambiar el nombre de la carpeta si tu instructor exige usar exactamente solo un nombre y un apellido.
