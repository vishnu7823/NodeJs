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

app.put('/api/students/:id',(req,res)=>{

    let id = HTMLTableRowElement.params.id;
    let obj1 = studentArray.find((item)=>{
        return item.id === id
    })

    if(obj1 === undefined){
        res.sendStatus(404);
    }
    let data = req.body;
    let newobj1 = {...obj1,...data}
    let index = studentArray.indexOf(obj1)
    studentArray[index]  = newobj1;
    res.send(studentArray)

})


app.delete('/api/students',(req,res)=>{

    let id = HTMLTableRowElement.params.id;
    let obj1 = studentArray.find((item)=>{
        return item.id === id
    })

    if(obj1 === undefined){
        res.sendStatus(404);
    }
    
  
    let index = studentArray.indexOf(obj1)
    studentArray.splice(index,1)
    res.send(studentArray)

})

app.listen(8000,()=>{
       console.log("listening to port 8000")
})