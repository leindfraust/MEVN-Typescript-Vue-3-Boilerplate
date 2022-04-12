require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors');
const history = require('connect-history-api-fallback')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const path = require('path')


//cors options
let allowlist = ['http://localhost:8080']
let corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {
            origin: true
        } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = {
            origin: false
        } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

//express usages
app.use(morgan('tiny'))
app.use(express.json())
app.use(history())
app.use(cors(corsOptionsDelegate))
app.use(express.static(path.join(__dirname, 'client/dist')))

//connect to MongoDB
const dbConnect = async () => {
    mongoose.connect(process.env.mongouri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
};

dbConnect().then(() => console.log('MongoDB online')).catch((err) => console.log(err))

//listen server
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
});

//serving for production
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'client/dist/index.html'))

});