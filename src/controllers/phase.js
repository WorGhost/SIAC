const Phase = require('../models/phase')

exports.createPhase = async(req, res) => {

    try{
        const id = req.params.id
        const phase = new Phase(req.body)
        phase.project = id 
        await phase.save()
        res.status(201).send(phase)
    }catch(err){
        console.log(err)
        res.status(400).send({error : 'error al crear la fase'})
    }
}

exports.viewPhase = async(req,res) => {
    
    try{
        const phases = await Phase.find({})
        res.status(201).send(phases)
    } catch (err) {
        console.log(err)
    }
}

exports.deletePhase = async(req , res) => {

    try{

        const id = req.params.id
        const phase = await Phase.findByIdAndDelete(id)
        res.status(200).send(phase)

    }catch (err) {

        res.status(400).send({ error : ' Error al eliminar la phase '})

    }

}