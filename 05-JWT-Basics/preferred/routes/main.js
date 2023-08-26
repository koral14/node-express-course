const express = require('express')
const router = express.Router()

const { logon, hello } = require('../controllers/main')

const authMiddleware = require('../middleware/authentication')

router.route('/logon').post(logon)
router.route('/hello').get(authMiddleware, hello)

module.exports = router