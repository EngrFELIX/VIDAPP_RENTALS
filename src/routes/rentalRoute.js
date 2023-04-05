const {getRental, createRental, getSingleRentedMovie, deleteRental} = require('../controllers/rental')
const express = require('express')
const router = require("express").Router()


router.get('/', getRental)
router.post('/', createRental)
router.get('/:id', getSingleRentedMovie)
router.delete('/', deleteRental)

module.exports = router
