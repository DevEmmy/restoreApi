const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const { mongoose } = require('mongoose')
const userRouter = require("./Routers/userRoutes")
const documentRouter = require("./Routers/documentRoutes")

const app = express();
app.use(cors({
    origin: "*"
}))

const port = process.env.PORT || 5656
const uri = process.env.DB_URI
// "mongodb://127.0.0.1:27017/rediones"
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection
connection.once('open', ()=>{console.log('Database running Successfully')})

app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: false}));

app.use("/users", userRouter )
app.use("/documents", documentRouter)

app.listen(port, ()=>console.log(`Hello ${port}`))