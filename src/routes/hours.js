const express = require('express')
const router = express.Router()
const hourController = require('../controllers/hours')

router.route('/projects/:idProject/phases/:idPhase/hour')
    .post( hourController.registerHour )
    .get( hourController.viewHour)

//admin
router.get('/allHours', hourController.allHoursAdmin)

module.exports = router;