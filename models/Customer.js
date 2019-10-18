const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        max : 255
    },
    email : {
        type : String,
        required : true,
        min : 6
    },
    phone : {
        type : String,
        required : true
    },
    adress : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Customer', customerSchema)