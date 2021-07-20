const User = require('./User');
const Grill = require('./Grill');
const Category = require('./Category');
const Brand = require('./Brand');
const Feature = require('./Feature');
const Size = require('./Size');

User.belongsTo(Grill, {foreignKey: 'grill_id'});

//  Grill.belongsTo(User, {
//      foreignKey: 'owner_id'
// });

module.exports =  { User, Grill, Category, Brand, Feature, Size };