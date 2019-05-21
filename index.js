require('dotenv').config();
const mongoose = require('mongoose')
      Worker = require('./src/Models/workerSchema')
      Order = require('./src/Models/orderSchema')
const express = require('express')
        app = express()
        bodyParser = require('body-parser')
        cors = require('cors')
        PORT = process.env.PORT || 8080
        MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/hatchdb'

//Mongoose set-up
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongod connected!')
});

//express set-up
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//serve static files in public folder
app.use(express.static(`${__dirname}/public`))

//import routes
app.use('/api', require('./routes'))

//app init
app.listen(PORT, () => {
    console.log(`Server listening on PORT:${ PORT }`)
})

module.exports = app