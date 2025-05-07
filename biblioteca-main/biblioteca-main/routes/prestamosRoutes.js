// routes/prestamosRoutes.js
const express = require('express');
const router = express.Router();
const prestamosController = require('../controllers/prestamosController');

router.get('/', prestamosController.getAllPrestamos);
router.post('/crear', prestamosController.createPrestamo);
router.post('/editar/:id', prestamosController.editarPrestamo);
router.get('/devolver/:id', prestamosController.devolverPrestamo);
router.get('/borrar/:id', prestamosController.deletePrestamo);
router.get('/editar/:id', prestamosController.mostrarEditar);

module.exports = router;
