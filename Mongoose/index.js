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

adder()