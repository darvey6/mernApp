
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const cardRouter = require('./routes/card-router')
const path = require('path');

const app = express()
const apiPort = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
})


    // app.use(express.static(path.join(__dirname, '../build')));
    // app.get('*', function(req, res) {
    //     res.sendFile(path.join(__dirname, '../build', 'index.html'));
    // });

app.use('/api', cardRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))