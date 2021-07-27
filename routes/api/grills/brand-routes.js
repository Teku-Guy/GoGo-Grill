const router = require('express').Router();
const { Grill, Category, Size, Brand, User, FeatureTag, Feature  }  = require('../../../models');

//The `api/brands/` endpoint

//get all brands and related grill groups
router.get('/', (req, res) => {
    Brand.findAll({
        include: [
            {
                model: Grill,
                attributes: ['id', 'owner_id', 'createdAt',],
                include: [
                    {
                        model: Brand,
                        attributes: [['brand_name', 'name']]
                    },
                    {
                        model: Category,
                        attributes: [['category_name', 'type']]
                    },
                    {
                        model: Size,
                        attributes: ['dimensions']
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
});

//get brand by id
router.get('/:id', (req, res) => {});

// create a new brand
router.post('/', (req, res) => {});

//update an existing brand
router.put('/:id', (req, res) => {});

//delete an existing brand
router.delete('/:id', (req, res) => {});

module.exports = router;