const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesurls = require('./routes/routes')
const cors = require('cors')

dotenv.config()


mongoose.connect(process.env.DATA_BASE_ACCESS, (error,result) =>{
    if(error){
        console.log(error)
    }
    console.log("Database connected")
})
mongoose.connection.on('error', err => {
  console.log(err);
});

app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>res.send("api is working! hello!"))
app.use('/app', routesurls)
app.listen(4000, () => console.log("server is up and running on 4000"))