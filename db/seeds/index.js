//import data to seed
const seedUsers = require('./user-seeds');
const seedGrills = require('./grill_seeds');
const sequelize = require('../../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    await seedGrills();
    console.log('\n----- GRILLS SEEDED -----\n');

    process.exit(0);
  };
  
  seedAll();