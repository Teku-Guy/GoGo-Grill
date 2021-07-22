const router = require('express').Router();
const { User, Grill, Brand, Category, Size, FeatureTag }  = require('../../models');

//The `api/users/` endpoint

//get all users
router.get('/', (req, res) => {
    User.findAll({
        include: [
            {
                model: Grill,
                attributes: ['id', 'owner_id'],
                include: [
                    {
                        model: Brand,
                        attributes: ['brand_name']
                    },
                    {
                        model: Category,
                        attributes: ['category_name']
                    },
                    {
                        model: Size,
                        attributes: ['dimensions']
                    },
                    {
                        model: FeatureTag,
                        attributes: ['feature_name']
                    }
                ]
            }
        ]
    })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get a single user by id
router.get('/:id', (req, res) => {
    User.findOne({
        where:{
            id: req.params.id
        }
    })
    .then(userData => {
        if(!userData){
            //if ID does not exist return this message
            res.status(404).json({ message: 'No USER found with this id' });
            return;
        }
        //return the data
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Create a new user
router.post('/', (req, res) => {
    User.create(req.body)
    .then(userData => res.status(200).json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Update User Info
router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if(!userData){
            //if ID does not exist return this message
            res.status(404).json({ message: 'No USER found with this id' });
            return;
        }
        //return the data
        res.status(200).json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//DEL user
router.delete('/:id', (req, res) => {
    User.destroy({
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