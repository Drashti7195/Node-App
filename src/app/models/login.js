const mongoose = require('mongoose')

const LoginSchema = mongoose.Schema({
    login: String,
    password: String
}, {
    timestamps: true
});
module.exports = mongoose.model('Login', LoginSchema,"users");