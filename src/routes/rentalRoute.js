const {getRental, createRental,} = require('../controllers/rental')
const express = require('express')
const router = express.Router()


router.get('/', getRental)
router.post('/', createRental)


module.exports = router
