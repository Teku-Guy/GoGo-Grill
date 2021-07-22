const router = require('express').Router();
const { Grill }  = require('../../../models');

//The `api/grills/` endpoint

//get all grills and related data
router.get('/', (req, res) => {
    Grill.findAll()
    .then(grillData => res.json(grillData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get a single grill by id
router.get('/:id', (req, res) => {
    Grill.findOne({
        where:{
            id: req.params.id
        }
    })
    .then(grillData => {
        if(!grillData){
            //if ID does not exist return this message
            res.status(404).json({ message: 'No GRILL found with this id' });
            return;
        }
        //return the data
        res.json(grillData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Grill.create(req.body)
    .then(grillData => res.status(200).json(grillData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
    Grill.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(grillData => {
        if(!grillData){
            res.status(404).json({ message: 'No GRILL found with this id'});
            return;
        }
        res.json(grillData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Grill.destroy({
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
})

module.exports = router;