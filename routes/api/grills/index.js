const router = require('express').Router();

const grillRoutes = require('./grill-routes');

router.use('/', grillRoutes);

module.exports = router;