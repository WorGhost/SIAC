const Project = require('../models/project')
const jwtDecoded = require('../middleware/user')

exports.createProject = async (req,res) =>{
    
    try{
        jwtDecoded.loginMiddleware
        const project = new Project(req.body)
        await project.save()
        res.status(201).send(project)

    } catch (err){
        console.log(err)
        res.status(400).send({ err: ' error al crear el proyecto'})
    }

}

exports.viewProject = async(req,res) => {
    try{
        jwtDecoded.loginMiddleware
        const projects = await Project.find({user : req.userId})
        res.status(200).send(projects)
    } catch (err) {
        console.log(err)
        res.status(400).send({ err : ' Error al obtener los proyectos'})
    }
}

exports.viewOneProject = async(req,res) => {
    try{
        const id = req.params.id
        const project = await Project.findById(id)
        res.status(200).send(project)
    } catch (err) {
        console.log(err)
        res.status(400).send({ err : ' Error al obtener el proyecto'})
    }
}

exports.editProject = async (req,res) => {
    const  id  = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','client','manager']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({ err : 'Aqui esta el error'})
    }

    try{
        const project = await Project.findByIdAndUpdate(id , {...req.body} , {new: true})
        if(!project){
            return res.status(400).send({ err : 'Actualización no valida'})
        }

        updates.forEach((update) => (project[update] = req.body[update]))
        await project.save()
        res.send(project)

    } catch (err) {
        console.log(err)
        res.status(400).send({ err: ' error al editar el proyecto'})
    }
}

exports.deleteProject = async (req, res) => {
    try {
      const project = await Project.findOneAndDelete({ _id: req.params.id});
  
      if (!project) {
        return res.status(404).send({ error: 'Proyecto no encontrado' });
      }
  
      res.send(project);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error al eliminar el proyecto' });
    }
  };


exports.addUserInProject = async(req,res) => {
    try{
        const projectId = req.params.id
        const project = await Project.findById(projectId)

        if (project.manager !==req.user._id){
            return res.status(401).send({ error: 'No está autorizado para realizar esta acción' });
        }

        const newUserId = req.body.userId;

        if(project.user.includes(newUserId)){
            return res.status(401).send({ error: 'El usuario ya esta asociado a este projecto' });
        }

        project.user.push(newUserId)

        await project(save)

        res.status(200).send(project)

    }catch ( err ) {
        console.log(err)
        res.status(400).send({ err: 'Error al agregar usuario al proyecto' });
    }
}

