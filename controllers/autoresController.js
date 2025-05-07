const pool = require('../db/conexion');

// Mostrar todos los autores
exports.getAllAutores = async (req, res) => {
  const [autores] = await pool.query('SELECT * FROM autores');
  res.render('autores', { autores });
};

// Crear autor nuevo
exports.createAutor = async (req, res) => {
  const { nombre } = req.body;
  await pool.query('INSERT INTO autores (nombre) VALUES (?)', [nombre]);
  res.redirect('/autores');
};

// Eliminar autor
exports.deleteAutor = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM autores WHERE id = ?', [id]);
  res.redirect('/autores');
};

// Mostrar formulario con datos del autor
exports.editAutorForm = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query('SELECT * FROM autores WHERE id = ?', [id]);

  if (result.length === 0) return res.send('Autor no encontrado');

  res.render('editarAutor', { autor: result[0] });
};

// Guardar los cambios editados
exports.updateAutor = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  await pool.query(
    'UPDATE autores SET nombre = ? WHERE id = ?',
    [nombre, id]
  );

  res.redirect('/autores');
};

// ver autores
exports.getAutorById = async (req, res) => {
  const { id } = req.params;
  const [autor] = await pool.query('SELECT * FROM autores WHERE id = ?', [id]);
  res.render('detall_Autores', { autor: autor[0] });
};
