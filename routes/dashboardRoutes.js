const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Listar usuarios
router.get('/', dashboardController.menuDashboard);
router.get('/pendientes-antiguos', dashboardController.pendientesAntiguosDashboard);
router.get('/prestamos-autor', dashboardController.prestamosAutorDashboard);
router.get('/categoria-genero', dashboardController.categoriaGeneroDashboard);
router.get('/bueno-bonito-barato', dashboardController.buenoBonitoBaratoDashboard);
router.get('/grafico-mensual', dashboardController.graficoMensualDashboard);

module.exports = router;