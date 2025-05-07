const express = require('express');
const router = express.Router();
const librosController = require('../controllers/librosController');

router.get('/', librosController.getAllLibros);
router.post('/crear', librosController.createLibro);
router.get('/eliminar/:id', librosController.deleteLibro);
router.get('/ver/:id', librosController.getLibroById);
router.get('/editar/:id', librosController.editLibroForm);
router.post('/editar/:id', librosController.updateLibro);


module.exports = router;
