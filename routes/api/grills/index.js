const router = require('express').Router();

const grillRoutes = require('./grill-routes');
const categoryRoutes = require('./category-routes');
const featureRoutes = require('./feature-routes');
const sizeRoutes = require('./size-routes');
const brandRoutes = require('./brand-routes');

router.use('/categories', categoryRoutes);
router.use('/features', featureRoutes);
router.use('/sizes', sizeRoutes);
router.use('/brands', brandRoutes);
router.use('/', grillRoutes);


module.exports = router;