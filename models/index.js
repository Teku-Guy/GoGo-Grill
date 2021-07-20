const User = require('./User');
const Grill = require('./Grill');

User.belongsTo(Grill, {foreignKey: 'grill_id'});

//  Grill.belongsTo(User, {
//      foreignKey: 'owner_id'
// });

module.exports =  { User, Grill };