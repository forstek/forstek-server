const router = require('express').Router()
const Joi = require('@hapi/joi')
const User = require('../models/User')

const createSchema = Joi.object({
    name: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .required()
        .email(),
    password: Joi.string()
        .required()
        
})
const loginSchema = Joi.object({
    email: Joi.string()
        .required()
        .email(),
    password: Joi.string()
        .required()
        
})

router.post('/create', async (request, response) => {
    const responseDetail = {"error":true}
    const body = request.body
    const validation = createSchema.validate(body)
    const { error, value } = validation
    if (error) {
        responseDetail.message = "Please send email and password!"
        response.status(400).json({...responseDetail})
    } 
    const user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
    })
    try {
        const saveUser = await user.save()
        responseDetail.error = false
        response.status(200).json({...responseDetail, user: saveUser})
    } catch (err) {
        response.status(400).send(err)
    }
})

router.post('/login', (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
    response.set('Access-Control-Allow-Credentials', 'true')
    const responseDetail = {"error":true}
    const body = request.body
    const validation = loginSchema.validate(body)
    const { error, value } = validation
    if (error) {
        responseDetail.message = "Please send email and password!"
        response.json({...responseDetail})
    }
    responseDetail.error = false
    responseDetail.token = "token"
    response.json({...responseDetail})
})

module.exports = router