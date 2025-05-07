// routes/prestamosRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db/conexion');


// Listar préstamos con libros y usuarios
exports.getAllPrestamos = async (req, res) => {
  const [prestamos] = await pool.query(`
    SELECT prestamos.*, usuarios.nombre AS usuario, libros.titulo AS libro
    FROM prestamos
    LEFT JOIN usuarios ON prestamos.usuario_id = usuarios.id
    LEFT JOIN libros ON prestamos.libro_id = libros.id
  `);

  const [usuarios] = await pool.query('SELECT * FROM usuarios');
  const [libros] = await pool.query('SELECT * FROM libros');
  const botones = true;
  titulo_listado = "";
  res.render('prestamos', { prestamos, usuarios, libros, botones,titulo_listado });
};

// Crear préstamo
exports.createPrestamo = async (req, res) => {
    let { usuario_id, libro_id, fecha_prestamo, fecha_devolucion } = req.body;
  
    fecha_prestamo = fecha_prestamo || null;
    fecha_devolucion = fecha_devolucion || null;
  
    // Solo la fecha de préstamo es obligatoria
    if (!fecha_prestamo) {
      return res.status(400).send('La fecha de préstamo es obligatoria.');
    }
  
    await pool.query(
      `INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion)
       VALUES (?, ?, ?, ?)`,
      [
        usuario_id, 
        libro_id, 
        fecha_prestamo, 
        fecha_devolucion === '' ? null : fecha_devolucion
      ]
    );
  
    res.redirect('/prestamos');
  };
  

// Borrar préstamo
exports.deletePrestamo = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM prestamos WHERE id = ?', [id]);
  res.redirect('/prestamos');
};


exports.devolverPrestamo = async (req, res) => {
  const { id } = req.params;
  const hoy = new Date().toISOString().split('T')[0];

  await pool.query(
    'UPDATE prestamos SET fecha_devolucion = ? WHERE id = ?',
    [hoy, id]
  );

  res.redirect('/prestamos');
};

// Mostrar el formulario con datos existentes
exports.mostrarEditar = async (req, res) => {
  const id = req.params.id;
  try {
    const obtenerPrestamoPorId = async (id) => {
      const [rows] = await pool.query('SELECT * FROM prestamos WHERE id = ?', [id]);
      return rows[0]; // Devuelve solo un préstamo
    };
    const obtenerLibros = async () => {
      const [rows] = await pool.query('SELECT * FROM libros');
      return rows;
    };

    const obtenerUsuarios = async () => {
      const [rows] = await pool.query('SELECT * FROM usuarios');
      return rows;
    };

    const prestamo = await obtenerPrestamoPorId(id);
    const libros = await obtenerLibros();
    const usuarios = await obtenerUsuarios();

    if (!prestamo) {
      return res.send('Préstamo no encontrado.');
    }

    res.render('editarPrestamo', {
      prestamo,
      usuarios,
      libros
    });
    
  } catch (err) {
    console.error(err);
    res.send('Error al cargar préstamo');
  }
};


// Actualizar los datos del préstamo
exports.editarPrestamo = async (req, res) => {
  const id = req.params.id;
  const { fecha_prestamo, fecha_devolucion, estado } = req.body;
  try {
    await pool.query(
      'UPDATE prestamos SET fecha_prestamo = $1, fecha_devolucion = $2, estado = $3 WHERE id = $4',
      [fecha_prestamo, fecha_devolucion, estado, id]
    );
    res.redirect('/prestamos?mensaje=Préstamo actualizado');
  } catch (err) {
    console.error(err);
    res.send('Error al actualizar préstamo');
  }
};
