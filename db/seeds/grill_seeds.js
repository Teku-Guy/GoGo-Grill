const { Grill } = require('../../models');

const grillData = [
    {
        category_id: '1',
        size_id: '1',
        brand_id:'1',
        owner_id: '1'
    },
    {
        category_id: '2',
        size_id: '2',
        brand_id:'2',
        owner_id: '1'
    },
    {
        category_id: '3',
        size_id: '2',
        brand_id:'2',
        owner_id: '1'
    }
]

const seedGrills = () => Grill.bulkCreate(grillData);

module.exports = seedGrills;