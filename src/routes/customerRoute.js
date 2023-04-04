const express = require('express')
const router = express.Router()
const { getAllCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer} = require("../controllers/customer")

router.get("/", getAllCustomers)
router.get("/:id", getCustomer)
router.post("/", createCustomer)
router.put("/:id", updateCustomer)
router.delete("/:id", deleteCustomer)
// router.route("/").get((req,res)=> {
//     res.json("working successfully now")
// })

module.exports = router