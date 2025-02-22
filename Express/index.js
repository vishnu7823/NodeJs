var express = require('express');
var app = express();

// var fs = require('fs')
// var path = require('path')
var userRouter = require('./Routes/userRouter');
var adminRouter = require('./Routes/adminRouter')

// var file = fs.readFileSync("./public/index.html","utf-8");

// var staticpath = path.join(__dirname,'public');

// app.use(express.static(staticpath));
app.use('/auth',userRouter);
app.use('/admin',adminRouter);

// app.get('/',(req,res)=>{
//    res.sendFile(path.join(staticpath,'index.html'));
// })

// app.get('/about',(req,res)=>{
//     res.sendFile(path.join(staticpath,'about.html'));
// })

// app.get('/contact',(req,res)=>{
//     res.sendFile(path.join(staticpath,'contact.html'));
// })

app.listen(4000,()=>{
    console.log("server is listeining on port 4000");
})

