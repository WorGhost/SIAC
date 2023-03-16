const express = require('express')
const router = express.Router()
const hourController = require('../controllers/hours')

router.post('/hour', hourController.registerHour )
router.get('/hour', hourController.viewHour)

//admin
router.get('/allHours', hourController.allHoursAdmin)

module.exports = router;