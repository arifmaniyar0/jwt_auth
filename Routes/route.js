const express = require('express')
const {login, verify}  = require('../auth/login')

const route = express.Router();


route.get('/',(req, res) => {
    res.json('routes in node js');
})

route.post('/login', login)

route.get('/home', verify, (req, res) => {
    res.send('Welcome to home page')
})

module.exports = route