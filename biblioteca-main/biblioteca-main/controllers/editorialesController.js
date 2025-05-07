const pool = require('../db/conexion');

// Listar todas las editoriales
exports.getAllEditoriales = async (req, res) => {
  const [editoriales] = await pool.query('SELECT * FROM editoriales');
  res.render('editoriales', { editoriales });
};

// Crear nueva editorial
exports.createEditorial = async (req, res) => {
  const { nombre } = req.body;
  await pool.query('INSERT INTO editoriales (nombre) VALUES (?)', [nombre]);
  res.redirect('/editoriales');
};

// Eliminar editorial
exports.deleteEditorial = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM editoriales WHERE id = ?', [id]);
  res.redirect('/editoriales');
};

// Mostrar formulario de edición de una editorial
exports.getEditorialById = async (req, res) => {
  const { id } = req.params;
  const [editorial] = await pool.query('SELECT * FROM editoriales WHERE id = ?', [id]);
  if (editorial.length === 0) {
    return res.status(404).send('Editorial no encontrada');
  }
  res.render('editorial_editar', { editorial: editorial[0] });
};

// Procesar formulario de edición
exports.updateEditorial = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  await pool.query('UPDATE editoriales SET nombre = ? WHERE id = ?', [nombre, id]);
  res.redirect('/editoriales');
};

// ver editoriales
exports.getEditorialDetalleById = async (req, res) => {
  const { id } = req.params;
  const [editorial] = await pool.query('SELECT * FROM editoriales WHERE id = ?', [id]);
  res.render('detall_editoriales', { editorial: editorial[0] });

};
