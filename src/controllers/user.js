const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.login = async(req,res) => {
    const {username , password} = req.body;
    const user = await User.findOne({ username })

    if(!user){
        return res.status(401).json({message : 'El error es aqui'})
    }

    const isMatch = await bcrypt.compare(password , user.password)

    if(!isMatch){
        return res.status(401).json({message : 'Es diferente'})
    }

    const token = jwt.sign({id: user._id},'secret',{expiresIn: '1h'});

    res.status(200).json({token});
}

exports.createUser = async (req, res) => {
    const { username, email, password, name } = req.body

    try{
        const user = await User.create({ username, email, password, name})
        res.json(user);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}