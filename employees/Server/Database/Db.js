var mongoose = require('mongoose')


const connectDB = async ()=>{

    try{
       await  mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb is connected");
    }
    catch(error){
        console.log(error)
    }



}




module.exports = connectDB
