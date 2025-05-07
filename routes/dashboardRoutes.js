const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Listar usuarios
router.get('/', dashboardController.menuDashboard);

// Listar libros baratos y cortos
router.get('/librosBaratosCortos', dashboardController.librosBaratosCortos);

// Ruta para obtener el gráfico de alquileres por mes
router.get('/graficoMensual', dashboardController.graficoAlquileresPorMes);

module.exports = router;


