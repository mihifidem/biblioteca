const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');

// Listar empleados
router.get('/', empleadosController.getAllEmpleados);

// Crear empleado
router.get('/crear', empleadosController.formEmpleado);
router.post('/add', empleadosController.addEmpleado);

// Borrar empleado
router.get('/eliminar/:id_empleado', empleadosController.deleteEmpleado);

// // editar empleado
router.get('/editar/:id_empleado', empleadosController.editarEmpleado);

// // actualizar empleado
router.post('/actualizar/:id_empleado', empleadosController.actualizarEmpleado);

// ver empleado
router.get('/ver/:id_empleado', empleadosController.detallEmpleado);

module.exports = router;
