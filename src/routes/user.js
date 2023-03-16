const express = require('express')
const authController = require('../controllers/user')

const router = express.Router();

router.post('/login', authController.login)
router.post('/signup', authController.createUser )

module.exports = router;