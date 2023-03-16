const mongoose = require('mongoose')

const phaseSchema = mongoose.Schema({
    name: {type : String, required: true},
    description : { type: String},
    hours : [{ type: mongoose.Schema.Types.ObjectId, ref : 'Hour'}],
    project : [{ type: mongoose.Schema.Types.ObjectId, ref : 'Project'}],
})

const Phase = mongoose.model('Phase', phaseSchema)

module.exports = Phase