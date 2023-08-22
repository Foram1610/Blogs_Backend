const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
require('./config/connection')
const route = require('./routers/index')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use("/avatar", express.static(path.join(__dirname, '/public/avatar')));
app.use("/blogs", express.static(path.join(__dirname, '/public/blogs')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(route)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!!`)
})