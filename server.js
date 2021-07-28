const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const passport = require('passport');
const session = require('express-session');
var exphbs  = require('express-handlebars');

// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

//express middleware to parse json requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//passport middleware
app.use(express.static("public"));
app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 //expires cookie in one day
  }
}));
app.use(passport.initialize());
app.use(passport.session());

//import our routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

