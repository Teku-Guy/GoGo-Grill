const { Category } = require('../models');

const categoryData = [
    {
        category_name: 'Charcoal'
    },
    {
        category_name: 'Wood'
    },
    {
        category_name: 'Propane'
    },
    {
        category_name: 'Electric'
    },
    {
        category_name: 'Pellets'
    },
    {
        category_name: 'Ceramic'
    },
    {
        category_name: 'Industrial'
    }
]

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;