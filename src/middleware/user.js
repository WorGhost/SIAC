const jwt = require('jsonwebtoken');

exports.loginMiddleware = (req,res,next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message : 'Failed authentication madafaka'})
    }
    jwt.verify(token , 'secret' ,(err,decoded) => {
        if(err){
            return res.status(401).json({message : 'Failed authentication madafaka'})
        }
        req.userId = decoded.id;
        next();
    })
}