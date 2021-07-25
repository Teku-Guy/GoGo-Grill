const router = require('express').Router();
const { Category, User, Grill, Brand, Size, FeatureTag }  = require('../../../models');

// the `/api/grills/categories` endpoint

//get all categories and grills related too
router.get('/', (req, res) => {
    Category.findAll({
        include: [
            {
                model: Grill,
                attributes: ['id', 'owner_id'],
                include: [
                    {
                        model: Brand,
                        attributes: [['brand_name', 'name']]
                    },
                    {
                        model: Size,
                        attributes: ['dimensions']
                    },
                    {
                        model: FeatureTag,
                        attributes: [['feature_name', 'feature']],
                        through: {attributes: []}
                    },
                    {
                        model: User,
                        as: 'Owner',
                        attributes: ['id','first_name','last_name']
                    }
                ]
            }
        ]
    })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//get all categories by id
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
//create a new category
router.post('/', (req, res) => {
    Category.create(req.body)
    .then(categoryData => res.status(200).json(categoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//update an existing category
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

//delete an existing category
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