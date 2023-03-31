const express = require('express')
const router = express.Router()
const {getMovies, createMovie, deleteMovie} = require('../controllers/movie')

router.get('/', getMovies)
router.post('/', createMovie)
router.delete('/', deleteMovie)

module.exports = router