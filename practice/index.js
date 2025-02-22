const express = require('express');
const app = express();


app.get('/',(req,res)=>{

    res.send("Hello world");

})


app.listen(4000,(req,res)=>{
    console.log("server listening to port 4000")
})