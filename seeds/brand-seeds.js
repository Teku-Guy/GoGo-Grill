const { Brand } = require('../models');

const brandData = [
    {
        brand_name: 'Big Green Egg'
    },
    {
        brand_name: 'Broil King'
    },
    {
        brand_name: 'BroilMaster'
    },
    {
        brand_name: 'CharGriller'
    },
    {
        brand_name: 'Coleman'
    },
    {
        brand_name: 'Dyna-Glo'
    },
    {
        brand_name: 'Kenmore'
    },
    {
        brand_name: 'Kitchen Aid'
    },
    {
        brand_name: 'Napoleon'
    },
    {
        brand_name: 'Traeger'
    },
    {
        brand_name: 'Weber'
    }
];


const seedBrands = () => Brand.bulkCreate(brandData);

module.exports = seedBrands;