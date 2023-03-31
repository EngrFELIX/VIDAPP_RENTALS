const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const connectDb = require("./db/connect")

const genreRoutes = require("./routes/genreRoute")

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/v1/customers",  require('./routes/customerRoute.js'));
app.use("/api/v1/genres", genreRoutes)
// const MONGODB_URI = process.env.MONGODB_URI

// mongoose.connect(MONGODB_URI).then(result => {
//     console.log("Database connect successfully")
// }).catch(error => {
//     console.log(error.message)
// })

const start = async () => {
    try{
        await connectDb(process.env.MONGODB_URI);
        app.listen(PORT, () => {
            console.log(`Server started at PORT ${PORT}`)
        })
    }
    catch(error){
        console.log(error.message)
    }
}

start();

// app.listen(PORT, () => {
//     console.log("listening on port")
// })



