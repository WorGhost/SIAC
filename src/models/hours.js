const mongoose = require('mongoose')

const hoursSchema = new mongoose.Schema({
    date: { type : Date , required : true },
    hoursWork: { type : Number , required : true },
    description: { type : String , required : true },
    username: { type : mongoose.Schema.Types.ObjectId , ref : 'User' }
})

const Hour = mongoose.model('Hour', hoursSchema)

module.exports = Hour