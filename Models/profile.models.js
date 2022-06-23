const mongoose = require("mongoose")
const Schema = mongoose.Schema

const profileSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    matricNumber: {type: Number},
    level: {type: String},
    telephone: {type: String},
    college: {type: String},
    department: {type: String},
    user: {type: Schema.Type.ObjectId , ref:"User"},
})

const Profile = mongoose.model("Profile", profileSchema)
module.exports = Profile