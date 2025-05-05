const pool = require('../db/conexion');

// Mostrar todos los libros con autores y editoriales
exports.getAllLibros = async (req, res) => {
  const [libros] = await pool.query(`
    SELECT libros.*, autores.nombre AS autor, editoriales.nombre AS editorial
    FROM libros
    LEFT JOIN autores ON libros.autor_id = autores.id
    LEFT JOIN editoriales ON libros.editorial_id = editoriales.id
  `);

  const [autores] = await pool.query('SELECT * FROM autores');
  const [editoriales] = await pool.query('SELECT * FROM editoriales');

  res.render('libros', { libros, autores, editoriales });
};

// Crear libro
exports.createLibro = async (req, res) => {
  const { titulo, autor_id, editorial_id } = req.body;
  await pool.query('INSERT INTO libros (titulo, autor_id, editorial_id) VALUES (?, ?, ?)', [titulo, autor_id, editorial_id]);
  res.redirect('/libros');
};

// Borrar libro
exports.deleteLibro = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM libros WHERE id = ?', [id]);
  res.redirect('/libros');
};

// ver libros
exports.getLibroById = async (req, res) => {
  const libroId = req.params.id;

  const [rows] = await pool.query(`
    SELECT 
      libros.id,
      libros.titulo,
      libros.anio_publicacion,
      libros.autor_id,
      autores.nombre AS autor_nombre,
      libros.editorial_id,
      editoriales.nombre AS editorial_nombre
    FROM libros
    JOIN autores ON libros.autor_id = autores.id
    JOIN editoriales ON libros.editorial_id = editoriales.id
    WHERE libros.id = ?
  `, [libroId]);

  if (rows.length === 0) {
    return res.status(404).send("Libro no encontrado");
  }

  const libro = rows[0];
  res.render('detall_libros', { libro });
};

//Editar libros formulario
exports.editLibroForm = async (req, res) => {
  const { id } = req.params;

  const [libros] = await pool.query(`
    SELECT * FROM libros WHERE id = ?
  `, [id]);

  const [autores] = await pool.query('SELECT * FROM autores');
  const [editoriales] = await pool.query('SELECT * FROM editoriales');

  if (libros.length === 0) {
    return res.status(404).send("Libro no encontrado");
  }

  res.render('editar_libro', {
    libro: libros[0],
    autores,
    editoriales
  });
};
 //actualizar libros
 exports.updateLibro = async (req, res) => {
  const { id } = req.params;
  const { titulo, autor_id, editorial_id, anio_publicacion } = req.body;

  await pool.query(
    'UPDATE libros SET titulo = ?, autor_id = ?, editorial_id = ?, anio_publicacion = ? WHERE id = ?',
    [titulo, autor_id, editorial_id, anio_publicacion, id]
  );

  res.redirect('/libros');
};

