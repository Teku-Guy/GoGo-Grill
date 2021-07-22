const router = require('express').Router();
const { Feature, FeatureTag }  = require('../../../models');

//get all features, related grills, and tags
router.get('/', (req, res) => {});

//get features by id
router.get('/:id', (req, res) => {});

// create a new features
router.post('/', (req, res) => {});

//update an existing features
router.put('/:id', (req, res) => {});

//delete an existing features
router.delete('/:id', (req, res) => {});

module.exports = router;