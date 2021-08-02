const path = require('path');
const express = require('express');
const routes = require('./routes');
const passport = require('passport');
const session = require('express-session');
var exphbs  = require('express-handlebars');

// import sequelize connection
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session({
  secret: 'Super secret secret',
  cookie: {
    // maxAge: 1000 * 60 * 60 * 24 //expires cookie in one day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}));


//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//express middleware to parse json requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



//import our routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

