const express = require('express');
const router = express.Router();
const cotizacionController = require('../controllers/cotizacionController');

router.post('/cotizacion', cotizacionController.createCotizacion); // POST /api/tickets

module.exports = router;
