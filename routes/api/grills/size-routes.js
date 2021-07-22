const router = require('express').Router();
const { Size }  = require('../../../models');

//get all sizes and related grills
router.get('/', (req, res) => {});

//get sizes by id
router.get('/:id', (req, res) => {});

// create a new sizes
router.post('/', (req, res) => {});

//update an existing sizes
router.put('/:id', (req, res) => {});

//delete an existing sizes
router.delete('/:id', (req, res) => {});

module.exports = router;