const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Listar usuarios
router.get('/', dashboardController.menuDashboard);

// listar libros
router.get('/librosBaratosCortos', dashboardController.librosBaratosCortos);

module.exports = router;