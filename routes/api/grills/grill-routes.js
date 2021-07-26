const router = require('express').Router();
const { Grill, Category, Size, Brand, User, FeatureTag, Feature }  = require('../../../models');

//The `api/grills/` endpoint

//get all grills and related data
router.get('/', (req, res) => {
    Grill.findAll({
        attributes: ['id'],
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
    })
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
//create a new Grill
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      category_id: '3',
      size_id: '2',
      brand_id:'2',
      owner_id: '1',
      featureIds: [1, 2, 3, 4]
  */
    Grill.create(req.body)
    .then((grill)=>{
        //if there's feature tags then we need to create pairings to bulk crea in the FeatureTag model
        if(req.body.featureIds.length) {
            const featureIdArr = req.body.featureIds.map((tag_id) => {
                return {
                    grill_id: grill.id,
                    tag_id
                };
            });
            return Feature.bulkCreate(featureIdArr);
        }
        //if no feature tags just respond
        res.status(200).json(grill);
    })
    .then((featTagIds) => res.status(200).json(featTagIds))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Grill.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then((grill) => {
        //find all associated tags from Feature
        return Feature.findAll({ where: {grill_id: req.params.id} });
    })
    .then((grillData) => {
        // get list of current tag_ids
        const featureTagIds = grillData.map(({ tag_id }) => tag_id);
        // create filtered list of new tag_ids
        const newFeatures = req.body.featureIds
        .filter((tag_id) => !featureTagIds.includes(tag_id))
        .map((tag_id) => {
            return {
            grill_id: req.params.id,
            tag_id,
            };
        });
        // figure out which ones to remove
        const featuresToRemove = grillData
        .filter(({ tag_id }) => !req.body.featureIds.includes(tag_id))
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

router.delete('/:id', (req, res) => {
    Grill.destroy({
        where: {
            id: req.params.id
        }
      })
        .then(grillData => {
            if (!grillData) {
                res.status(404).json({ message: 'No GRILL found with this id' });
                return;
            }
            res.status(200).json(grillData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;