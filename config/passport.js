const passport = require("passport");
const passportJwt = require("passport-jwt");
const LocalStrategy = require('passport-local').Strategy;
const sequelize = require('./connection');
const User = connection.models.User;