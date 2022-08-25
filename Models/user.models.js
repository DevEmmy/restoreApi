const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String, require: true},
    password: {type: String, require: true},
    firstName: {type: String},
    lastName: {type: String},
    matricNumber: {type: Number},
    level: {type: String},
    telephone: {type: String},
    college: {type: String},
    department: {type: String},
    avatar: {type: String},
    admin: {type: Boolean, default:false}
})

const User = mongoose.model("User", userSchema)
module.exports = User