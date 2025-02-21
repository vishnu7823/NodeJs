const express = require('express')
const app = express();
const dotenv = require('dotenv')
const connectDb = require('./config/Db')
const identifyContact = require('./routes/routes')

dotenv.config();
connectDb();

// app.get('/',(req,res)=>{
//     res.send("hello")

// })
app.use(express.json());
app.use('/api',identifyContact);

app.listen(process.env.PORT,()=>{
    console.log("Server is connected to",process.env.PORT);
})