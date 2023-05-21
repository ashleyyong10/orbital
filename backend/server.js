const express = require("express")
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = 8000

connectDB()

const app = express()

//allows us to access the json body from the request directly
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/modules', require('./routes/moduleRoutes'))

app.listen(port)

