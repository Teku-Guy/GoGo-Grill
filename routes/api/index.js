const router = require('express').Router();

const userRoutes = require('./user-routes');
const grillRoutes = require('./grills');
const apptRoutes = require('./appt-routes');

router.use('/users', userRoutes);
router.use('/grills', grillRoutes);
router.use('/appts', apptRoutes);

module.exports = router;