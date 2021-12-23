import bcrypt from 'bcryptjs'
const data = {
    users: [
        {
            name: 'Kham',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
            money: 500000,
        },
        {
            name: 'John',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
            money: 0,
        },
    ]
}

export default data