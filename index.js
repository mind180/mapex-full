const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const authRouter = require('./routers/authRouter')
const mapRouter = require('./routers/mapRouter')
const stageRouter = require('./routers/stageRouter')
const commentRouter = require('./routers/commentRouter')
const connectionRouter = require('./routers/connectionRouter')
const userRouter = require('./routers/userRouter')
const Board = require('./models/Board')
const Stage = require('./models/Stage')
const User = require('./models/User')
const Connection = require('./models/Connection')

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.raw({ type: 'application/octet-stream' }))

app.use((req, res, next) => {
    if (req.url.match('^\/api') || req.url.match('^\/auth')) {
        next()
    } else {
        return res.sendFile(__dirname + '/public/index.html')
    }
})
app.use('/auth', authRouter)
app.use('/api/v1/', mapRouter)
app.use('/api/v1', stageRouter)
app.use('/api/v1', connectionRouter)
app.use('/api/v1', commentRouter)
app.use('/api/v1', userRouter)

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
    res.sendFile(__dirname + '/build/index.html')
})
  
app.get('/test', async (req, res) => {
    const board = await Board.findOne({})

    const connections = await Connection.find({})
    
    res.send(connections)
})

start()