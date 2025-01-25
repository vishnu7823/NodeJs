var express = require('express')
var students = require('./initilaData');
const studentArray = require('./initilaData');
var currentId =studentArray.length;
console.log(currentId)
var app = express();

app.use(express.json()); // to convert into js format that recives from req in json format

app.get('/api/students',(req,res)=>{
    res.send(students);

})

app.get('/api/students/:id',(req,res)=>{
     let id = req.params.id;
     
    
    if(isNaN(id)){
        return res.sendStatus(400)
    }
    else{
        id = parseInt(id);
        let obj = studentArray.find((item)=>{
            return item.id === id;
        })
        if(obj === undefined){
            res.sendStatus(404);
        }
        res.send(obj)
    }
})


app.post('/api/students',(req,res)=>{

    let mydata = req.body; 
    let key = Object.keys(mydata)
   if(key.find((item)=> item === "name") && key.find((item)=> item === "curentClass") && key.find((item)=> item === "division")){
    currentId++;
    studentArray.push({id:currentId,name:mydata.name,currentClass:mydata.currentClass,division:mydata.division})
    return res.send(studentArray);
   }else{
    return res.sendStatus(400);
   }
   
    
    
})

app.listen(4000,()=>{
       console.log("listening to port 4000")
})