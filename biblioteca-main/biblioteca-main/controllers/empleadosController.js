const pool = require('../db/conexion');

// Mostrar todos los empleados
exports.getAllEmpleados = async (req, res) => {
  const [empleados] = await pool.query('SELECT * FROM empleados');
  res.render('empleados', { empleados });
};

// Mostrar formulario para crear nuevo empleado
exports.formEmpleado = async (req, res) => {
  res.render('formEmpleado');
};

// Agregar empleado nuevo
exports.addEmpleado = async (req, res) => {
  const {
    dni, nombre, email, telefono, direccion, CP,
    poblacion, provincia, IBAN, estado_civil, sexo
  } = req.body;

  await pool.query(
    `INSERT INTO empleados 
    (dni, nombre, email, telefono, direccion, CP, poblacion, provincia, IBAN, estado_civil, sexo) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [dni, nombre, email, telefono, direccion, CP, poblacion, provincia, IBAN, estado_civil, sexo]
  );

  res.redirect('/empleados');
};

// Eliminar empleado
exports.deleteEmpleado = async (req, res) => {
  const { id_empleado } = req.params;
  await pool.query('DELETE FROM empleados WHERE id_empleado = ?', [id_empleado]);
  res.redirect('/empleados');
};

exports.editarEmpleado = async (req, res) => {
  const { id_empleado } = req.params;
  const [result] = await pool.query('SELECT * FROM empleados WHERE id_empleado = ?', [id_empleado]);

  if (!result || result.length === 0) {
    return res.status(404).send('Empleado no encontrado');
  }

  res.render('edit_empleado', {
    empleado: result[0],
    action: `/empleados/actualizar/${id_empleado}`
  });
};


// Procesar actualización de empleado
exports.actualizarEmpleado = async (req, res) => {
  const { id_empleado } = req.params;
  const {
    dni, nombre, email, telefono, direccion, CP,
    poblacion, provincia, IBAN, estado_civil, sexo
  } = req.body;

  await pool.query(
    `UPDATE empleados SET 
      dni = ?, nombre = ?, email = ?, telefono = ?, direccion = ?, CP = ?, 
      poblacion = ?, provincia = ?, IBAN = ?, estado_civil = ?, sexo = ?
    WHERE id_empleado = ?`,
    [dni, nombre, email, telefono, direccion, CP, poblacion, provincia, IBAN, estado_civil, sexo, id_empleado]
  );

  res.redirect('/empleados');
};


//ver empleado
exports.detallEmpleado = async (req, res) => {
  const { id_empleado } = req.params;
  const [result] = await pool.query('SELECT * FROM empleados WHERE id_empleado = ?', [id_empleado]);

  if (!result || result.length === 0) {
    return res.status(404).send('Empleado no encontrado');
  }

  res.render('detall_empleado', {
    empleado: result[0],
    action: `/empleados/detall/${id_empleado}`
  });
};