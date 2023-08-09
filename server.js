require('dotenv').config()

const { PORT= 3300 } = process.env

const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Yo Dr CHeeze Bee')
})

app.listen(PORT, () => console.log(`listening to your cheezey aZZ on Port ${PORT}`))

