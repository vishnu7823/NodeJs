var express = require('express');
var userRouter = express.Router();


userRouter.get('/user',(req,res)=>{
        res.send("this is user page")
})

userRouter.get('/details',(req,res)=>{
     res.send("this is detail page")
})

module.exports = userRouter;