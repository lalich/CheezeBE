require('dotenv').config()

const { PORT= 3300, DATABASE_URL } = process.env

const express = require('express')

const app = express()
const mongoose = require('mongoose')

const cors = require('cors')
const morgan = require('morgan')

// DATAbase stuff
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
mongoose.connection
    .on('open', () => console.log('connected to mongoose'))
    .on('close', () => console.log('you are disconnected from mongoose'))
    .on('error', (error) => console.log(error))

const CheezeSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
})

const Cheeze = mongoose.model('Cheeze', CheezeSchema)

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Yo Dr CHeeze Bee')
})

app.get('/cheeze', async (req, res) => {
    try {
        res.json(await Cheeze.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

app.post('/cheeze', async (req, res) => {
    try {
        res.json(await Cheeze.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})






app.listen(PORT, () => console.log(`listening to your cheezey aZZ on Port ${PORT}`))

