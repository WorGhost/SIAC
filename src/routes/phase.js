const express = require('express')
const router = express.Router()
const phaseController = require('../controllers/phase')

router.route('/projects/:idProject/phases')
    .get(phaseController.viewPhase)
    .post(phaseController.createPhase)

router.route('/projects/:idProject/phases/:idPhase')
    .delete(phaseController.deletePhase)

module.exports = router