var express = require('express')
var adminRouter = express.Router()


adminRouter.get('/dashboard',(req,res)=>{
    res.send("dashboard of admin")
})

adminRouter.get('/dashboard/:userid',(req,res)=>{
    var userid = req.params.userid;   //dynamic routing
    console.log(userid);
    res.send(userid);
   
    
   
})


module.exports = adminRouter;