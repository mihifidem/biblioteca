const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Listar usuarios
router.get('/', dashboardController.menuDashboard);
<<<<<<< HEAD
router.get('/pendientes-antiguos', dashboardController.pendientesAntiguosDashboard);
router.get('/prestamos-autor', dashboardController.prestamosAutorDashboard);
router.get('/categoria-genero', dashboardController.categoriaGeneroDashboard);
=======
>>>>>>> e9c32c435990b2c76805188172e57c9e6d8273e3

module.exports = router;