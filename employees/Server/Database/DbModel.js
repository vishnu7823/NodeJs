var mongoose = require('mongoose');

const employeeschema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase:true
    },
    age:{
        type:Number,
        required:true,
        min:18
    },
    salary:{
        type:Number,
        require:true
    }
})

const Employee = mongoose.model('Employee',employeeschema);

module.exports = Employee;