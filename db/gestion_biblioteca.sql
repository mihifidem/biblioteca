DROP DATABASE IF EXISTS  gestion_biblioteca;

CREATE DATABASE gestion_biblioteca;

use gestion_biblioteca;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE editoriales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100)
);

CREATE TABLE autores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100)
);


CREATE TABLE libros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150),
  editorial_id INT,
  autor_id INT,
  FOREIGN KEY (editorial_id) REFERENCES editoriales(id),
  FOREIGN KEY (autor_id) REFERENCES autores(id)
);

CREATE TABLE prestamos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  libro_id INT,
  fecha_prestamo DATE,
  fecha_devolucion DATE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (libro_id) REFERENCES libros(id)
);

CREATE TABLE empleados (
id_empleado INT AUTO_INCREMENT PRIMARY KEY,
dni VARCHAR(10),
nombre VARCHAR(50),
email VARCHAR(50)
);

INSERT INTO usuarios (nombre, email) VALUES
('Laura Martínez', 'laura.martinez@example.com'),
('Carlos Pérez', 'carlos.perez@example.com'),
('Ana Gómez', 'ana.gomez@example.com'),
('David Rodríguez', 'david.rodriguez@example.com'),
('Lucía Torres', 'lucia.torres@example.com');

INSERT INTO editoriales (nombre) VALUES
('Planeta'),
('Anagrama'),
('Alfaguara'),
('Destino'),
('Tusquets');


INSERT INTO autores (nombre) VALUES
('Gabriel García Márquez'),
('Isabel Allende'),
('Javier Marías'),
('Mario Vargas Llosa'),
('Rosa Montero');

INSERT INTO libros (titulo, editorial_id, autor_id) VALUES
('Cien años de soledad', 1, 1),
('La casa de los espíritus', 2, 2),
('Corazón tan blanco', 3, 3),
('La fiesta del chivo', 4, 4),
('La ridícula idea de no volver a verte', 5, 5),
('El amor en los tiempos del cólera', 1, 1),
('Paula', 2, 2),
('Los enamoramientos', 3, 3),
('Travesuras de la niña mala', 4, 4),
('Historia del Rey Transparente', 5, 5);

INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion) VALUES
(1, 1, '2025-04-01', '2025-04-15'),
(2, 2, '2025-04-02', '2025-04-16'),
(3, 3, '2025-04-03', '2025-04-17'),
(4, 4, '2025-04-04', '2025-04-18'),
(5, 5, '2025-04-05', '2025-04-19'),
(1, 6, '2025-04-06', NULL),
(2, 7, '2025-04-07', NULL),
(3, 8, '2025-04-08', NULL),
(4, 9, '2025-04-09', NULL),
(5, 10, '2025-04-10', NULL);

INSERT INTO empleados (dni,nombre,email) VALUES 
('44536726V', 'Dolores Fuertes', 'doloresfuertes@decabeza.com');

ALTER TABLE empleados
ADD telefono VARCHAR(15),
ADD direccion VARCHAR(100),
ADD CP VARCHAR(10),
ADD poblacion VARCHAR(50),
ADD provincia VARCHAR(50),
ADD IBAN VARCHAR(34),
ADD estado_civil VARCHAR(20),
ADD sexo VARCHAR(10);


ALTER TABLE usuarios
ADD telefono VARCHAR(15),
ADD direccion VARCHAR(100),
ADD CP VARCHAR(10),
ADD poblacion VARCHAR(50),
ADD provincia VARCHAR(50),
ADD estado_civil VARCHAR(20),
ADD sexo VARCHAR(10);


ALTER TABLE libros ADD COLUMN anio_publicacion YEAR;


-- Añadir genero-usuario y categoria-libro
ALTER TABLE usuarios ADD COLUMN genero ENUM('H','M','X');
ALTER TABLE libros ADD COLUMN id_categoria INT;

UPDATE usuarios SET genero = 'M' WHERE id = 1;
UPDATE usuarios SET genero = 'H' WHERE id = 2;
UPDATE usuarios SET genero = 'M' WHERE id = 3;
UPDATE usuarios SET genero = 'H' WHERE id = 4;
UPDATE usuarios SET genero = 'M' WHERE id = 5;

UPDATE libros SET id_categoria = 1 WHERE id = 1;
UPDATE libros SET id_categoria = 2 WHERE id = 2;
UPDATE libros SET id_categoria = 1 WHERE id = 3;
UPDATE libros SET id_categoria = 3 WHERE id = 4;
UPDATE libros SET id_categoria = 4 WHERE id = 5;
UPDATE libros SET id_categoria = 2 WHERE id = 6;
UPDATE libros SET id_categoria = 2 WHERE id = 7;
UPDATE libros SET id_categoria = 1 WHERE id = 8;
UPDATE libros SET id_categoria = 3 WHERE id = 9;
UPDATE libros SET id_categoria = 2 WHERE id = 10;

alter table libros add precio decimal (5,2);



alter table libros add paginas int;
alter table libros add dibujos int;