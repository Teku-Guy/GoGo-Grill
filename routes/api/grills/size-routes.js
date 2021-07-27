const router = require('express').Router();
const { Size, Grill, Category, Brand, User, FeatureTag  } = require('../../../models');

//get all sizes and related grills
router.get('/', (req, res) => {
    Size.findAll({
        include: [
            {
                model: Grill,
                attributes: ['id', 'owner_id', 'createdAt'],
                include: [
                    {
                       model: Brand,
                       attributes: [['brand_name', 'name']],
                    },
                    {
                        model: Category,
                        attributes: [['category_name', 'typ']],
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
    .then(sizeData => res.json(sizeData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get sizes by id
router.get('/:id', (req, res) => {
    Size.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Grill,
                attributes: ['id', 'owner_id', 'createdAt'],
                include: [
                    {
                       model: Brand,
                       attributes: [['brand_name', 'name']],
                    },
                    {
                        model: Category,
                        attributes: [['category_name', 'typ']],
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
    .then(sizeData => {
        if(!sizeData){
            res.status(404).json({ message: 'No SIZES found with this id'})
            return;
        }
        res.json(sizeData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new sizes
router.post('/', (req, res) => {
/* req.body should look like this...
    {
        dimensions: '42x22x26'
    }
*/
    Size.create(req.body)
    .then(sizeData => res.status(200).json(sizeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//update an existing sizes
router.put('/:id', (req, res) => {
    Size.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    .then(sizeData => {
        if(!sizeData){
            res.status(404).json({ message: 'No SIZES found with this id'})
            return;
        }
        res.json(sizeData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete an existing sizes
router.delete('/:id', (req, res) => {
    Size.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(sizeData => {
        if(!sizeData){
            res.status(404).json({ message: 'No SIZES found with this id'})
            return;
        }
        res.json(sizeData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;