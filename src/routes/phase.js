const express = require('express')
const router = express.Router()
const phaseController = require('../controllers/phase')

router.route('/phases')
    .get(phaseController.viewPhase)
    .post(phaseController.createPhase)

router.route('/phases/:id')
    .delete(phaseController.deletePhase)

module.exports = router