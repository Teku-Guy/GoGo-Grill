const router = require('express').Router();

const grillRoutes = require('./grill-routes');
const categoryRoutes = require('./category-routes');

router.use('/categories', categoryRoutes);
router.use('/', grillRoutes);


module.exports = router;