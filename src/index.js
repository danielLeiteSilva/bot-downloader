require('dotenv').config()
const express = require('express')
const app = express()

//Composition
const bot = require('./server')

const port = process.env.PORT || 8080

app.get("/", (req, res) => {
    res.status(200).json({message: "I'm alive"})
})

app.listen(port, async () => {
    console.log(`Connected on port: ${port}`)
    await bot.start()
})