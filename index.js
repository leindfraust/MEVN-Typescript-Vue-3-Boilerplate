import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import history from 'connect-history-api-fallback'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path'

const app = express()
const PORT = process.env.PORT || 5000


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

//middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan('tiny'))
app.use(history())
app.use(cors(corsOptionsDelegate))

//fix __dirname and __filename not defined in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

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