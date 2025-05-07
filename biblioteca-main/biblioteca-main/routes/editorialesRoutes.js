const express = require('express');
const router = express.Router();
const editorialesController = require('../controllers/editorialesController');

// Listar editoriales
router.get('/', editorialesController.getAllEditoriales);

// Crear editorial
router.post('/crear', editorialesController.createEditorial);

// Borrar editorial
router.get('/eliminar/:id', editorialesController.deleteEditorial);

//editar editorial
router.get('/editar/:id', editorialesController.getEditorialById);
router.post('/editar/:id', editorialesController.updateEditorial);

// ver editoriales
router.get('/ver/:id', editorialesController.getEditorialDetalleById); // ✅ correcto

module.exports = router;
