# Finflow - Módulo web de gestión de usuarios en React

Evidencia **GA7-220501096-AA3-EV01: Codificación de módulos del software stand-alone, web y móvil**.

Este proyecto aplica el framework **React** para construir la interfaz web del módulo de usuarios de Finflow. La interfaz permite registrar, consultar, actualizar y eliminar usuarios. También valida que no se repitan el documento de identidad ni el correo electrónico.

## Paso a paso para ejecutarlo

1. Instala Node.js 18 o una versión superior desde `https://nodejs.org/`.
2. Abre una terminal en la carpeta `modulo-react-usuarios`.
3. Ejecuta `npm install`. Esto descarga React y Vite definidos en `package.json`.
4. Ejecuta `npm run dev`.
5. Abre en el navegador la dirección que aparece en la terminal, normalmente `http://localhost:5173`.
6. Registra un usuario, edítalo, intenta repetir documento o correo y elimínalo. Así demuestras todas las funciones.

## Relación con los artefactos de análisis y diseño

- Historia de usuario: “Como administrador, deseo gestionar usuarios para mantener actualizada la información de Finflow”.
- Caso de uso: gestionar usuarios; las acciones son registrar, consultar, actualizar y eliminar.
- Diagrama de clases: `App` controla la interfaz y cada objeto usuario contiene id, documento, nombres, apellidos, correo y teléfono.
- Prototipo: la distribución con formulario y tabla lleva a código la pantalla de gestión de usuarios.
- Plan tecnológico: React, JSX, CSS, Vite, Node.js y Git.

## Estándares y comentarios

Las funciones y variables usan camelCase (`guardarUsuario`, `idEdicion`); los componentes usan PascalCase (`App`, `Campo`); los nombres son descriptivos. `App.jsx` contiene comentarios que describen cada instrucción. El PDF `CODIGO_JSX_COMENTADO_AA3_EV01.pdf` incluye el código JSX con explicación por línea para adjuntarlo a la evidencia.

## Control de versiones

El proyecto se encuentra en un repositorio Git. El archivo `ENLACE_REPOSITORIO_AA3.txt` contiene el enlace que debe acompañar esta entrega.
