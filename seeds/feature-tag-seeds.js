const { FeatureTag } = require('../models');

const tagData = [
    {
        feature_name: 'Side Burner'
    },
    {
        feature_name: 'Smoker'
    },
    {
        feature_name: 'Fuel Gage'
    },
    {
        feature_name: 'Propane Tray'
    },
    {
        feature_name: 'Multi Burner'
    },
    {
        feature_name: 'Ashpan'
    },
    {
        feature_name: 'Easy-Open Grates'
    },
    {
        feature_name: 'Multiple Vents'
    },
    {
        feature_name: '4 Wheels'
    },
    {
        feature_name: '2 Wheels'
    },
    {
        feature_name: '0 Wheels'
    },
    {
        feature_name: 'Utensil Hooks'
    },
    {
        feature_name: 'Condiments Bin'
    },
    {
        feature_name: 'Temp Gauge'
    },
    {
        feature_name: 'Single Cooking Shelf'
    },
    {
        feature_name: 'Dual Cooking Shelf'
    }
];

const seedFeatureTags = () => FeatureTag.bulkCreate(tagData);

module.exports = seedFeatureTags;