const User = require('./User');
const Grill = require('./Grill');
const Category = require('./Category');
const Brand = require('./Brand');
const Feature = require('./Feature');
const FeatureTag = require('./FeatureTag');
const Size = require('./Size');
const Appointment = require('./Appointment');

//User can have multiple Griils
Grill.belongsTo(User, {
   foreignKey:'owner_id'
});

//Grills can belong to one User
User.hasMany(Grill, {
   foreignKey: 'owner_id'
});

//Griils has one Category
Grill.belongsTo(Category, {
   foreignKey: 'category_id'
});

//Category can be on more than one Grill
Category.hasMany(Grill, {
   foreignKey: 'category_id'
})

//Grills cam have one Sizes
Grill.belongsTo(Size, {
   foreignKey: 'size_id'
});

Size.hasOne(Grill, {
   foreignKey: 'size_id'
});

//Grill can have one brand
Grill.belongsTo(Brand, {
   foreignKey: 'brand_id'
});

Brand.hasOne(Grill, {
   foreignKey: 'brand_id'
});

/***** set up the one-to-many relationships between Grill and FeatureTag, and Feature and FeatureTag respectively *****/

//Grill Can have many feature tags
Grill.belongsToMany(FeatureTag, {
   through: Feature,
   foreignKey: 'grill_id'
});

//FeatureTag Can have manny grills
FeatureTag.belongsToMany(Grill, {
   through: Feature,
   foreignKey: 'tag_id'
})

module.exports =  { User, Grill, Category, Brand, Feature, FeatureTag, Size, Appointment };