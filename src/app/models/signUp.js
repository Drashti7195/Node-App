const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    full_name: String,
    email:String,
    login:String,
    password: String,
    mobile:String,
    country:String,
    profileUrl:String    

}, {
    timestamps: true
});
module.exports = mongoose.model('User', UserSchema,"users");