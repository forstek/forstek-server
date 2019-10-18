const router = require('express').Router()
const Customer = require('../models/Customer')
const Joi = require('@hapi/joi')

const schema = Joi.object({
    name: Joi.string()
        .max(255)
        .required(),
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    phone: Joi.string()
        .required(),
    address: Joi.string()
        .required(),
})

router.post('/create', (request, response) => {
    const body = request.body
    const validation = schema.validate(body)
    const { error, value } = validation
    response.status(400).send(error)
    // const customer = new Customer({
    //     name: body.name,
    //     email: body.email,
    //     phone: body.phone,
    //     adress: body.address,
    // })
    // try {
    //     const saveCustomer = await customer.save()
    //     response.send(saveCustomer)
    // } catch (err) {
    //     response.status(400).send(err)
    // }
})

module.exports = router