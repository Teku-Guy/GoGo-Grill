const router = require('express').Router();
const { Feature, FeatureTag, Grill, Brand, Category, Size, User }  = require('../../../models');

//get all features, related grills, and tags
router.get('/', (req, res) => {
    FeatureTag.findAll({
        attributes: ['id', ['feature_name', 'feature']],
        include: [
            {
                model: Grill,
                attributes: ['id'],
                through: {attributes: []},
                include: [
                    {
                    model: Brand,
                    attributes: [['brand_name', 'name']],
                    },
                    {
                        model: Category,
                        attributes: [['category_name', 'type']],
                    },
                    {
                        model: Size,
                        attributes: ['dimensions']
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
    .then(featureData => res.json(featureData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//get features by id
router.get('/:id', (req, res) => {
    FeatureTag.findOne({
        where:{
            id: req.params.id
        },
        attributes: ['id', ['feature_name', 'Feature']],
        include: [
            {
                model: Grill,
                attributes: ['id'],
                through: {attributes: []},
                include: [
                    {
                    model: Brand,
                    attributes: [['brand_name', 'name']],
                    },
                    {
                        model: Category,
                        attributes: [['category_name', 'type']],
                    },
                    {
                        model: Size,
                        attributes: ['dimensions']
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
    .then(featureData => {
        if(!featureData){
            //if ID does not exist return this message
            res.status(404).json({ message: 'No FEATURE found with this id' });
            return;
        }
        res.json(featureData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a new features
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      "feature_name": "test",
      "grillIds": [1, 2, 3, 4]
  */
    FeatureTag.create(req.body)
    .then((featureData) => {
        //if there's grill ids then we need to create pairings to bulk create in the FeatureTag model
        if(req.body.grillIds.length) {
            const featureIdArr = req.body.grillIds.map((grill_id) => {
                return {
                    grill_id,
                    tag_id: featureData.id
                };
            });
            return Feature.bulkCreate(featureIdArr);
        }
        //if no feature tags just respond
        res.status(200).json(featureData);
    })
    .then((featTagIds) => res.status(200).json(featTagIds))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//update an existing features
router.put('/:id', (req, res) => {
    FeatureTag.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then((grill) => {
        //find all associated grill_id from Feature
        return Feature.findAll({ where: {tag_id: req.params.id} });
    })
    .then((featureData) => {
        // get list of current grill_id
        const featureTagIds = featureData.map(({ grill_id }) => grill_id);
        // create filtered list of new grill_id
        const newFeatures = req.body.grillIds
        .filter((grill_id) => !featureTagIds.includes(grill_id))
        .map((grill_id) => {
            return {
            grill_id,
            tag_id: req.params.id,
            };
        });
        // figure out which ones to remove
        const featuresToRemove = featureData
        .filter(({ grill_id }) => !req.body.grillIds.includes(grill_id))
        .map(({ id }) => id);

        // run both actions
        return Promise.all([
            Feature.destroy({ where: { id: featuresToRemove } }),
            Feature.bulkCreate(newFeatures),
        ]);
    })
    .then((updatedFeatures) => res.json(updatedFeatures))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete an existing features
router.delete('/:id', (req, res) => {});

module.exports = router;