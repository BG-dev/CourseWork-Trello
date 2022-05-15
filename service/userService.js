const { validateUser } = require('./validators/userValidator')
const { writeDataToJsonFile } = require('./commandHelper')
const users = require('../integration/databases/users.json')
const bcrypt = require('bcrypt')
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const { getElementFromArrayById } = require('./arrayService');

const USERS_FILE = 'users.json'

async function addUser(newUserData){
    const { error } = validateUser(newUserData)
    if(error)
        throw new Error(error.details[0].message)

    const candidate = findUser(newUserData)
    if(candidate)
        throw new Error("This user already exists")

    const hashedPassword = await bcrypt.hash(newUserData.password, 12)
    const newUser = {
        id: uuid.v4(),
        login: newUserData.login,
        password: hashedPassword
    }
    
    const newUsers = [...users, newUser]
    writeDataToJsonFile(newUsers, USERS_FILE)
}

async function loginUser(userData){
    const { error } = validateUser(userData)
    if(error)
        throw new Error(error.details[0].message)

    const user = findUser(userData)

    if(!user)
        throw new Error("This user no exists")

    const isMatch = await bcrypt.compare(userData.password, user.password)

    if(!isMatch)
        throw new Error("Password is incorrect")
    
    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )

    return {token, login: userData.login, userId: user.id}
}


const findUser = user => 
    users
        .find(elem => elem.login.toLowerCase() === user.login.toLowerCase())

const findUserById = userId =>
    getElementFromArrayById(users, userId)

module.exports = {
    addUser,
    loginUser,
    findUserById
}
