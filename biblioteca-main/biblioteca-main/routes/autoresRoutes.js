const express = require('express');
const router = express.Router();
const autoresController = require('../controllers/autoresController');

// Listar autores
router.get('/', autoresController.getAllAutores);

// Crear autor
router.post('/crear', autoresController.createAutor);

// Borrar autor
router.get('/eliminar/:id', autoresController.deleteAutor);

// Mostrar formulario de edición
router.get('/editar/:id', autoresController.editAutorForm);

// Guardar cambios
router.post('/editar/:id', autoresController.updateAutor);

// ver autores
router.get('/ver/:id', autoresController.getAutorById);


module.exports = router;
