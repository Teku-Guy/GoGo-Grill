const { User } = require('../../models');

const userData = [
    {
        email: 'test@mail.com',
        password:'test1',
        first_name: 'test',
        last_name: 'user',
        age: '21',
        gender: 'male',
        email: 'test@mail.com',
        password: 'test1',
        grill_id: '1'
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;