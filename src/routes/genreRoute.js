const express = require('express');
const router = express.Router();
const {getAllGenres, getSingleGenre, createGenre, updateGenre, deleteGenre} = require("../controllers/genre")

router.get("/", getAllGenres);

//route to get a single genre
router.get("/:id", getSingleGenre)

router.post("/", createGenre);

router.put("/:id", updateGenre);

router.delete("/:id", (req, res) =>{
    console.log("deleteAllGenres")
})

module.exports = router;