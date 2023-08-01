const mongoose = require("mongoose")
const autoIncrement = require("mongoose-auto-increment")

const contactSchema = mongoose.Schema({
    name:String,
    phone:String,
})

autoIncrement.initialize(mongoose.connection)
contactSchema.plugin(autoIncrement.plugin,"contact")

const contact = mongoose.model("contact",contactSchema)
module.exports = contact

