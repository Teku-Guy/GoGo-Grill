const router = require('express').Router();
const { Brand }  = require('../../../models');

//get all brands and related grill groups
router.get('/', (req, res) => {});

//get brand by id
router.get('/:id', (req, res) => {});

// create a new brand
router.post('/', (req, res) => {});

//update an existing brand
router.put('/:id', (req, res) => {});

//delete an existing brand
router.delete('/:id', (req, res) => {});

module.exports = router;