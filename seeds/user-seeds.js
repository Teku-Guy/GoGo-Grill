const { User } = require('../models');

const userData = [
    {
        first_name: "Gustavo",
        last_name: "Muratalla",
        age: "21",
        gender: "male",
        address: "123 Main St. Santa Barbara, CA 93111",
        email: "gusmuratalla@gmail.com",
        password: "password123"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;