const pool = require('../db/conexion');

// Mostrar todos los usuarios
// exports.getAllUsuarios = async (req, res) => {
//   const [usuarios] = await pool.query('SELECT * FROM usuarios');
//   res.render('usuarios', { usuarios , usuario:{}, action:'/usuarios/crear'});
// };
exports.getAllUsuarios = (req, res) => {
  pool.query('SELECT * FROM usuarios')
    .then(([usuarios]) => {
      res.render('usuarios', { usuarios, usuario: {}, action: '/usuarios/crear' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al obtener los usuarios');
    });
};

// Crear usuario nuevo
exports.createUsuario = async (req, res) => {
  const { nombre, email, telefono, direccion, CP, poblacion, provincia, estado_civil, sexo } = req.body;
  
  await pool.query(
    `INSERT INTO usuarios (nombre, email, telefono, direccion, CP, poblacion, provincia, estado_civil, sexo) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nombre, email, telefono, direccion, CP, poblacion, provincia, estado_civil, sexo]
  );

  res.redirect('/usuarios');
};


// Eliminar usuario
exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
  res.redirect('/usuarios');
};
// editar usuario
exports.editarUsuario = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  res.render('usuarios',{usuarios:{},usuario: result[0], action:`/usuarios/actualizar/${id}`})
};

// editar usuario
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, direccion, CP, poblacion, provincia, estado_civil, sexo } = req.body;

  await pool.query(
    `UPDATE usuarios 
     SET nombre=?, email=?, telefono=?, direccion=?, CP=?, poblacion=?, provincia=?, estado_civil=?, sexo=? 
     WHERE id = ?`,
    [nombre, email, telefono, direccion, CP, poblacion, provincia, estado_civil, sexo, id]
  );

  res.redirect('/usuarios');
};


// ver por usuario
exports.getUsuarioById = async (req, res) => {
  const { id } = req.params;
  const [usuario] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  res.render('detallUsuario', { usuario: usuario[0] });
};

