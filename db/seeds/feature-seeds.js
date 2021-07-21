const { Feature } = require('../../models');

const featureData = [
    {
        tag_id: '1',
        grill_id: '1'
    },
    {
        tag_id: '2',
        grill_id: '1'
    },
    {
        tag_id: '3',
        grill_id: '1'
    },
];

const seedFeatures = () => Feature.bulkCreate(featureData);

module.exports = seedFeatures;