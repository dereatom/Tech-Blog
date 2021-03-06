const { User } = require('../models');

const userData = [
    {
        name: 'John',
        email: 'John@gmail.com',
        username: 'john',
        password: 'password1234'

    },
    {
        name: 'Janke',
        email: 'Janke@hotmail.com',
        username:'janke',
        password: 'password1234'
    },
    {
        name: 'Alex',
        email: 'alex@gmail.com',
        username: 'alex',
        password: 'password1234'
    },
    {
        name: 'Jena',
        email: 'jena@gmail.com',
        username:'jena',
        password: 'password1234'
    }
];
const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

 module.exports = seedUsers;
