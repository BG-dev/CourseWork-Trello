const express = require("express"); 
const { addUser, loginUser } = require('../../service/userService')

const router = express.Router()

router.post('/register', async(req, res) => {
    try {
        const {login, password} = req.body
        const user = {
            login,
            password
        }

        await addUser(user)
        res.status(201).send({
            message: "User was created"
        })
    } catch (error) {
        res.status(500).send({ message: 'Resgister error' })
    }
})

router.post('/login', async(req, res) => {
    try {
        const {login, password} = req.body
        const user = {
            login,
            password
        }
        
        const loginData = await loginUser(user)
        res.status(201).send({
            loginData,
            message: "User was created"
        })
    } catch (error) {
        res.status(500).send({ message: 'Resgister error' })
    }
})



module.exports = router
