//import data to seed
const seedUsers = require('./user-seeds');
const seedGrills = require('./grill_seeds');
const seedBrands = require('./brand-seeds');
const seedCategories = require('./category-seeds');
const seedFeatureTags = require('./feature-tag-seeds');
const seedFeatures = require('./feature-seeds');
const seedAppointments = require('./appointment-seeds');
const seedSizes = require('./size-seeds');

const sequelize = require('../../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    await seedBrands();
    console.log('\n----- BRANDS SEEDED -----\n');
    await seedCategories();
    console.log('\n----- CATEGORIES SEEDED -----\n');
    await seedSizes();
    console.log('\n----- SIZES SEEDED -----\n');
    await seedGrills();
    console.log('\n----- GRILLS SEEDED -----\n');
    await seedFeatureTags();
    console.log('\n----- FEATURE_TAGS SEEDED -----\n');
    await seedFeatures();
    console.log('\n----- FEATURES SEEDED -----\n');
    await seedAppointments();
    console.log('\n----- Appointment SEEDED -----\n');

    process.exit(0);
  };
  
  seedAll();