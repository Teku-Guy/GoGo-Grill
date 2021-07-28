const { Size } = require('../models');

const sizeData = [
    {
        dimensions: '42x22x26'
    },
    {
        dimensions: '42x39x20'
    },
    {
        dimensions: '49x60x24'
    },
    {
        dimensions: '48x62x24'
    },
    {
        dimensions: '19x0x20'
    },
    {
        dimensions: '51x52x33'
    },
    {
        dimensions: 'Industrial 69x124x21'
    },
];

const seedSizes = () => Size.bulkCreate(sizeData);

module.exports = seedSizes;