const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/signup', async (request, response) =>{
    console.log(request.body)
    try {
        const signUpUser = await User.create(request.body)
        response.json(signUpUser)
    } catch (error) {
        console.log(err)
        response.sendStatus(500)
    }
})

router.get('/users', async (request, response) =>{
    try {
        const user = await User.find(request.body)
        response.json(user)
    } catch (error) {
        console.log(err)
        response.sendStatus(500)
    }
})

module.exports = router;