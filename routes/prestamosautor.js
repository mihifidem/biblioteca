const express = require('express');
const router = express.Router();
const prestamosController = require('../controllers/prestamosController');

// Listar autores
router.get('/', prestamosController.prestamosautor);






module.exports = router;
