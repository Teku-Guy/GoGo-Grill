const router = require('express').Router();
const { User, Appointment } = require('../models');
const isAuthenticated = require('../utils')

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    // If the user already has account and is logged in, redirect
    if (req.user) {
      res.redirect("/profile");
    } else {
      res.render("login");
    }
});

router.get('/signup', (req, res) => {
  // If the user already has account and is logged in, redirect
    res.render("signup");
});

router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{model: Appointment}]
    });
    const user = userData.get({ plain: true });

    console.log(user);
    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    console.log(err);
  }
})

//returns 404 page if route not found
router.use((req, res) => {
    res.render("error");
});

module.exports = router;