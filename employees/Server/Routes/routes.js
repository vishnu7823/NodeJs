const express = require('express')  //express server

const router = express.Router(); // routingservices

const Employee  = require('../Database/DbModel')


//get logic
router.get('/employees',async (req,res)=>{

    try{
        const employees = await Employee.find();
        res.status(200).json(employees)
    }catch(error){
        res.status(400).json({message:"employee reading failed"})

    }

})



//employee post logic
router.post('/employees',async(req,res)=>{
    const {name,email,age,salary} = req.body;
    const newEmployee = new Employee({
        name:name,
        email:email,
        age:age,
        salary:salary
    })

    try{

        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);

    }catch(error){
        res.status(400).json({message:"employee creation failed"})


    }
})

//update logic

router.put('/employees/:id',async(req,res)=>{
    const{id} = req.params;
    const {name,email,age,salary} = req.body;

    try{
        const updateEmployee = await Employee.findByIdAndUpdate(id,
            {name,email,age,salary},
            {new:true}  // it return the new obj otheriwise it return the old data
        )
        if(!updateEmployee){
            return res.status(404).json({message:"Employee not found"})
        }
        res.status(200).json(updateEmployee);

    }catch(error){
        res.status(400).json({message:"updation failed"})
    }
})

//delete logic

router.delete('/employees/:id',async(req,res)=>{
    const{id} = req.params;

    try{

        const deleteEmployee = await Employee.findByIdAndDelete(id)
        if(!deleteEmployee){
            return res.status(404).json({messsage:"Employee not found"})
        }
        res.status(200).json(deleteEmployee)

    }catch(error){
        res.status(400).json({message:"deletion failed"})
    }
})
module.exports = router;
