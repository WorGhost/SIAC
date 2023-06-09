const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username : { type : String , required: true, unique : true },
    password: { type : String , required: true},
    email : { type : String , required: true, unique : true },
    name : { type : String, required : true },
    role : { type : String, enum: ['admin' , 'member'], default:'member'}
})

userSchema.pre('save', async function(next) {
    const user = this

    if (!user.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password,salt)

    user.password = hash;
    next();
})

userSchema.methods.comparePassword = async function(candidatePassword){
    const user = this;
    return bcrypt.compare(candidatePassword, user.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User