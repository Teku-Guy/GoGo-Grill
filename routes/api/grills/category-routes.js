const router = require('express').Router();
const { Category, User }  = require('../../../models');

// the `/api/grills/categories` endpoint

router.get('/', (req, res) => {
    Category.findAll({})
    .then(categoryData => res.json(categoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
    Category.findOne({
        where:{
            id: req.params.id
        }
    })
    .then(categoryData => {
        if(!categoryData){
            //if ID does not exist return this message
            res.status(404).json({ message: 'No USER found with this id' });
            return;
        }
        res.json(categoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Category.create(req.body)
    .then(categoryData => res.status(200).json(categoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Category.update(req.body, {
        where:{
            id: req.params.id
        }
    })
    .then(categoryData => {
        if(!categoryData){
            res.status(404).json({ message: 'No CATEGORIES found with this id'});
            return;
        }
        res.status(200).json(categoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
      })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No USER found with this id' });
                return;
            }
            res.status(200).json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;