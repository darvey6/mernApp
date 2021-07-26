
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const cardRouter = require('./routes/card-router')

const app = express()
const apiPort = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('../build'))
}

app.use('/api', cardRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))