const Hour = require('../models/hours')
const jwtDecoded = require('../middleware/user')

exports.registerHour = async (req, res) => {
    try{
        jwtDecoded.loginMiddleware;
        const hour = new Hour(req.body)
        hour.user = req.userId;
        await hour.save();
        res.status(201).send(hour);
    } catch ( err ) {
        console.log(err)
        res.status(401).send(err)
    }
}

exports.viewHour = async (req,res) => {
    try {
        jwtDecoded.loginMiddleware;
        const hours = await Hour.find({user : req.userId})
        res.send(hours)
    } catch (err) {
        res.status(500).send(err)
    }
}

// admin

exports.allHoursAdmin = async(req,res) => {
    if (!req.user.esAdmin) {
        return res.status(401).send({ error: 'No autorizado' });
      }
    try{
        const hours = await Hora.find();
        res.send(hours);
    } catch (err) {
        res.status(500).send(err)
    }
}
