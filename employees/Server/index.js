var express = require('express')
var app = express();
var dotenv = require('dotenv')
const cors = require('cors')
const database = require('./Database/Db')
const router = require('./Routes/routes')
app.use(express.json());
app.use(cors());

dotenv.config()

database();
app.get('/',(req,res)=>{

    res.send("this is backend page")

})

app.use('/api',router)




app.listen(process.env.PORT,()=>{
    console.log("server is running on port 5000")
    console.log(database);
})  

