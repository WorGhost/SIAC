const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project')


router.route('/projects')
    .get(projectController.viewProject)
    .post(projectController.createProject)

router.route('/projects/:id')
    .get(projectController.viewOneProject)
    .put(projectController.editProject, projectController.addUserInProject)
    .delete(projectController.deleteProject)

module.exports  = router