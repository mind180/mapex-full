const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routers/authRouter')
const boardRouter = require('./routers/boardRouter')
const Board = require('./models/Board')
const Stage = require('./models/Stage')
const User = require('./models/User')
const Connection = require('./models/Connection')

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth', authRouter)
app.use('/api/v1/', boardRouter)

function start() {
    try {
        connectToDatabase()
        app.listen(PORT, () => { console.log(`Example app listening on port ${PORT}`) })  
    } catch(e) {
        console.log(e);
    }
}

async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb+srv://Heroku:GreenLight180@cluster0.h4phsx7.mongodb.net/?retryWrites=true&w=majority', {});
      console.log('Connected to MongoDB!');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
app.get('/test', async (req, res) => {
    const board = await Board.findOne({})

    const connections = await Connection.find({})
    
    res.send(connections)
})

start()