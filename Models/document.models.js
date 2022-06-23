const mongoose = require("mongoose")
const Schema = mongoose.Schema

const documentsSchema = new Schema({
    document: {type: String, require: true},
    user: {type: Schema.Types.ObjectId , ref:"User"},
    title: {type: String },
    filter: {type: String}
})

const Document = mongoose.model("Document", documentsSchema)
module.exports = Document