const router = require('express').Router();
const passport = require('passport');
const { Sequelize } = require('sequelize');
const { User, Grill, Brand, Category, Size, FeatureTag, Feature }  = require('../../models');

//The `api/users/` endpoint

//get all users
router.get('/', (req, res) => {
    User.findAll({
        exclude: ['password'],
        include: [
            {
                model: Grill,
                as: 'Owned_Grills',
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
    /* req.body should look like this...
      {
        first_name: "Gustavo",
        last_name: "Muratalla",
        age: "21",
        gender: "male",
        address: "123 Main St. Santa Barbara, CA 93111",
        email: "gusmuratalla@gmail.com",
        password: "password123"
      }
    */
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

// router.post('/login', (req, res) => {
//     // expects {email: 'lernantino@gmail.com', password: 'password1234'}
//     User.findOne({
//       where: {
//         email: req.body.email
//       }
//     }).then(dbUserData => {
//       if (!dbUserData) {
//         res.status(400).json({ message: 'No user with that email address!' });
//         return;
//       }
  
//       const validPassword = dbUserData.checkPassword(req.body.password);
  
//       if (!validPassword) {
//         res.status(400).json({ message: 'Incorrect password!' });
//         return;
//       }
  
//       res.json({ user: dbUserData, message: 'You are now logged in!' });
//     });
//   });

// router.post('login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {

// });

module.exports = router;