-- Evidencia GA7-220501096-AA2-EV01: base de datos para el módulo de usuarios.
CREATE DATABASE IF NOT EXISTS finflow CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE finflow;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    documento_identidad VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(80) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    correo_electronico VARCHAR(120) NOT NULL UNIQUE,
    telefono_contacto VARCHAR(20) NOT NULL,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (documento_identidad, nombres, apellidos, correo_electronico, telefono_contacto)
VALUES ('1000000001', 'Usuario', 'Prueba', 'usuario.prueba@finflow.com', '3001234567');
