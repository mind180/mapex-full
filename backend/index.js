const express = require('express')
const PORT = process.env.PORT || 3000

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })  
    } catch(e) {
        console.log(e);
    }
}

start()