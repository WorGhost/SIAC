const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    name : { type: String , required : true },
    client : { type : String , required : true},
    manager : {type : String , required : true},
    phases : [{type: mongoose.Schema.Types.ObjectId, ref : 'Phase'}],
    users : [{
        user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        role : { type: String, enum: ['admin' , 'member'] , default: 'member'}
    }]
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project