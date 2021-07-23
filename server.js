const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');

// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

//express middleware to parse json requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//passport middleware
app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

