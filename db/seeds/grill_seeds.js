const { Grill } = require('../../models');

const grillData = [
    {
        grill_type: 'test',
        owner_id: '1'
    }
]

const seedGrills = () => Grill.bulkCreate(grillData);

module.exports = seedGrills;