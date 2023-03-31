const express = require('express')
const router = express.Router()

router.route("/").get((req,res)=> {
    res.json("working successfully now")
})

module.exports = router