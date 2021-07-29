const router = require('express').Router();
const passport = require("../../config/passport");
const { User, Grill, Brand, Category, Size, FeatureTag }  = require('../../models');

//The `api/users/` endpoint

//get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] },
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
        },
        attributes: { exclude: ['password'] },
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
router.post('/signup', (req, res) => {
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
    //.then(() => res.redirect(307, "/api/login")) redirect to our login route
    .catch(err => {
        console.log(err);
        res.status(401).json(err);
    });
});

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/login", passport.authenticate("local"), (req, res) => {
// Sending back a password, even a hashed password, isn't a good idea
// expects {email: 'lernantino@gmail.com', password: 'password1234'}
    res.json({
      email: req.user.email,
      id: req.user.id,
      message: 'You are now logged in!'
    });
});

// Route for logging user out
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
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