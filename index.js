const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const { mongoose } = require('mongoose')
const userRouter = require("./Routers/userRoutes")
const profileRouter = require("./Routers/profileRoutes")
const documentRouter = require("./Routers/documentRoutes")

const app = express();
app.use(cors({
    origin: "*"
}))

const port = process.env.PORT || 5555
const uri = process.env.DB_URI
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection
connection.once('open', ()=>{console.log('Database running Successfully')})

app.use("/users", userRouter )
app.use("/profiles", profileRouter )
app.use("/documents", documentRouter)

app.listen(port, ()=>console.log(`Hello ${port}`))