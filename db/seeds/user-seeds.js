const { User } = require('../../models');

const userData = [
    {
        username: 'test',
        email: 'test@mail.com',
        password:'test1'
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;