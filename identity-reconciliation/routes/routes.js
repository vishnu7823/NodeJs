const express = require('express')

const router = express.Router()

const {identifyContact}  =require('../controllers/controllers')

router.post('/identify',identifyContact)

module.exports = router;