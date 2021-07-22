const User = require('./User');
const Grill = require('./Grill');
const Category = require('./Category');
const Brand = require('./Brand');
const Feature = require('./Feature');
const FeatureTag = require('./FeatureTag');
const Size = require('./Size');
const Appointment = require('./Appointment');

User.hasMany(Grill, {
   foreignKey: 'owner_id'
});

// Grill.belongsTo(User, {
//       foreignKey: 'owner_id'
// });

module.exports =  { User, Grill, Category, Brand, Feature, FeatureTag, Size, Appointment };