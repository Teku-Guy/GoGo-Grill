const router = require('express').Router();
const { Grill, Category, Size, Brand, User, FeatureTag }  = require('../../../models');

//The `api/grills/brands/` endpoint

//get all brands and related grill groups
router.get('/', (req, res) => {
    Brand.findAll({
        include: [
            {
                model: Grill,
                attributes: ['id', 'owner_id', 'createdAt'],
                include: [
                    {
                        model: Category,
                        attributes: [['category_name', 'type']]
                    },
                    {
                        model: Size,
                        attributes: ['dimensions']
                    },
                    {
                        model: User,
                        as: 'Owner',
                        attributes: [['id', 'user_id'],'first_name','last_name']
                    },
                    {
                        model: FeatureTag,
                        attributes: [['feature_name', 'feature']],
                        through: {attributes: []}
                    }
                ]
            }
        ]
    })
    .then(brandData => res.json(brandData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get brand by id
router.get('/:id', (req, res) => {
    Brand.findOne({
        where: {
            id: req.params.id
        },include: [
            {
                model: Grill,
                attributes: ['id', 'owner_id', 'createdAt',],
                include: [
                    {
                        model: Category,
                        attributes: [['category_name', 'type']]
                    },
                    {
                        model: Size,
                        attributes: ['dimensions']
                    },
                    {
                        model: User,
                        as: 'Owner',
                        attributes: [['id', 'user_id'],'first_name','last_name']
                    },
                    {
                        model: FeatureTag,
                        attributes: [['feature_name', 'feature']],
                        through: {attributes: []}
                    }
                ]
            }
        ]
    })
    .then(brandData => {
        if(!brandData){
            res.status(404).json({ message: 'No BRAND found with this id'});
            return;
        }
        res.json(brandData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new brand
router.post('/', (req, res) => {
/* req.body should look like this...
    {
      brand_name: 'Example Brand'
    }
*/
    Brand.create(req.body)
    .then(brandData => res.status(200).json(brandData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//update an existing brand
router.put('/:id', (req, res) => {
    Brand.update(req.body, {
        where:{
            id: req.params.id
        }
    })
    .then(brandData => {
        if(!brandData){
            res.status(404).json({ message: 'No BRAND found with this id'});
            return;
        }
        res.status(200).json(brandData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete an existing brand
router.delete('/:id', (req, res) => {
    Brand.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(brandData => {
        if(!brandData){
            res.status(404).json({ message: 'No BRAND found with this id'});
            return;
        }
        res.status(200).json(brandData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;