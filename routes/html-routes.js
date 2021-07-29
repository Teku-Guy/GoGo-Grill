const router = require('express').Router();
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

router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile')
})

//returns 404 page if route not found
router.use((req, res) => {
    res.render("error");
});

module.exports = router;