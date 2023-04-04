const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const connectDb = require("./db/connect")


const customerRoutes = require("./routes/customerRoute")
const genreRoutes = require("./routes/genreRoute")
const moviesRoutes = require("./routes/movieRoute")
const rentalRoutes = require("./routes/rentalRoute")
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/v1/customers",  customerRoutes);
app.use("/api/v1/genres", genreRoutes)
app.use("/api/v1/movies", moviesRoutes)
app.use("/api/v1/rentals", rentalRoutes)

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



