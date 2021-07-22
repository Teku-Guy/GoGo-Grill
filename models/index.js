const User = require('./User');
const Grill = require('./Grill');
const Category = require('./Category');
const Brand = require('./Brand');
const Feature = require('./Feature');
const FeatureTag = require('./FeatureTag');
const Size = require('./Size');
const Appointment = require('./Appointment');

//User can haveMany Grill objects
// User.hasMany(Grill);
Grill.belongsToMany(User, {
   through: Grill,
   foreignKey:'owner_id'
});

User.belongsTo(Grill, {
   through: Grill,
   foreignKey: 'owner_id'
});

Grill.belongsTo(Category, {
   foreignKey: 'category_id'
});

Category.hasMany(Grill, {
   foreignKey: 'category_id'
})

Grill.belongsToMany(FeatureTag, {
   through: Feature,
   foreignKey: 'grill_id'
});

FeatureTag.belongsToMany(Grill, {
   through: Feature,
   foreignKey: 'tag_id'
})

module.exports =  { User, Grill, Category, Brand, Feature, FeatureTag, Size, Appointment };