const mongoose = require('mongoose')

const ClientModel = mongoose.model('clients', {
    email: String,
    password: String,
})

module.exports = ClientModel;