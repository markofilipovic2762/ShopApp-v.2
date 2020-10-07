import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Marko Filipovic',
        email: 'markoadmin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Zika Zikic',
        email: 'pera@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Milica Jeknic',
        email: 'srckomoj@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users