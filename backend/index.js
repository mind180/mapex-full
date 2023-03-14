const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routers/authRouter')

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use('/auth', authRouter)

function start() {
    try {
        connectToDatabase()
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })  
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
  
app.get('/test', (req, res) => {

})
  
async function getUsers() {
    try {
        //const users = await User.find();
        //console.log(users);
    } catch (error) {
        console.error(error);
    }
}

start()