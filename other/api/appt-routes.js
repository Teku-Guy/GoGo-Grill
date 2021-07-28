const router = require('express').Router();
const { Appointment, Grill, User, Brand, Category, Size, FeatureTag }  = require('../../models');
const { route } = require('./grills');


//The `api/appts/` endpoint

//get all Appt and associated grill and user information
router.get('/', (req, res) => {
    Appointment.findAll({
      attributes: ['id', 'scheduled_date'],
      include: [
        {
          model: Grill,
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
        },
        {
          model: User,
          as: 'Client',
          attributes: [['id', 'user_id'], 'first_name', 'last_name', 'address', 'age']
        }
      ]
    })
    .then(apptData => res.json(apptData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get all Appt and associated grill and user information
router.get('/:id', (req, res) => {
  Appointment.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'scheduled_date'],
    include: [
      {
        model: Grill,
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
      },
      {
        model: User,
        as: 'Client',
        attributes: ['id', 'first_name', 'last_name', 'address', 'age']
      }
    ]
  })
  .then(apptData => res.json(apptData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Appointment.create(req.body)
  .then(apptData => res.status(200).json(apptData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Appointment.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(apptData => {
    if(!apptData){
      res.status(404).json({message: 'No APPT. found with this id' });
      return;
    }
    res.status(200).json(apptData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Appointment.destroy({
    where: {
        id: req.params.id
    }
  })
    .then(apptData => {
        if (!apptData) {
            res.status(404).json({ message: 'No APPT. found with this id' });
            return;
        }
        res.status(200).json(apptData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;