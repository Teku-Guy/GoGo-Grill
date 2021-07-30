const { User } = require('../../models');

const userData = [
    {
        first_name: "Gustavo",
        last_name: "Muratalla",
        email: "gusmuratalla@gmail.com",
        password: "password123",
        birthday: "07/22/2000",
        gender: "male",
        address: "123 Main St. Santa Barbara, CA 93111",
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;