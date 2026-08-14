const express = require('express');
const router = express.Router();

const healthRoutes = require('./healthRoutes');
const tourRoutes = require('./tourRoutes');
const contactRoutes = require('./contactRoutes');

router.use('/', healthRoutes);
router.use('/tours', tourRoutes);
router.use('/contact', contactRoutes);

module.exports = router;
