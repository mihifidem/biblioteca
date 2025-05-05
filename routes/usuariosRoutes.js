const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Listar usuarios
router.get('/', usuariosController.getAllUsuarios);

// Crear usuario
router.post('/crear', usuariosController.createUsuario);

// Borrar usuario
router.get('/eliminar/:id', usuariosController.deleteUsuario);

// editar usuario
router.get('/editar/:id', usuariosController.editarUsuario);

// actualizar usuario
router.post('/actualizar/:id', usuariosController.actualizarUsuario);

// ver usuario
router.get('/ver/:id', usuariosController.getUsuarioById);

module.exports = router;