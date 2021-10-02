const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesurls = require('./routes/routes')

const cors = require('cors')

dotenv.config()
const PORT = process.env.PORT || 4000;


mongoose.connect(process.env.DATA_BASE_ACCESS, {
  useNewUrlParser: true, useUnifiedTopology: true,
  useFindAndModify: false
}, (error,result) =>{
    if(error){
        console.log(error)
    }
    console.log("Database connected")
});
mongoose.connection.on('error', err => {
  console.log(err);
});

app.use(express.json())
app.use(cors({
  origin: "https://websitecotentful.netlify.app"
}))

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

//app.get("/",(req,res)=>res.send("api is working! hello!"))
app.use('/', routesurls)
app.listen(PORT, () => console.log("server is up and running on " + PORT))