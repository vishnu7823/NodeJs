var express = require('express');
var app = express();

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log("connected to db")
})

const student = new mongoose.Schema({
    name:String,
    email:String,
    age:Number
})
const students = new mongoose.model("students",student)

const adder = ()=>{

    const student1 = new students({
        name:"vishnu",
        email:"vishnu@gmail.com",
        age:21
    })
    student1.save();

}

// Add body-parser middleware to handle JSON requests
app.use(express.json());

// POST endpoint to add a new student
app.post('/add-student', async (req, res) => {
    try {
        const newStudent = new students({
            
            name: req.body.name,
            email: req.body.email,
            age: req.body.age




        });
        await newStudent.save();
        res.status(201).json({ message: "Student added successfully", student: newStudent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(8000,()=>{
    console.log("server is listeining on port 4000");
})


adder()