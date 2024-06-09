const mongoose = require('mongoose')

const UserModel = mongoose.model('users', {
    name: String,
    password: String,
    email: String,
    
    role: String
})

module.exports = UserModel;