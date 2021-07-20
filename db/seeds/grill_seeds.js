const { Grill } = require('../../models');

const grillData = [
    {
        category: '1',
        size: '1',
        brand:'1',
        feature: '1',
        owner_id: '1'
    }
]

const seedGrills = () => Grill.bulkCreate(grillData);

module.exports = seedGrills;