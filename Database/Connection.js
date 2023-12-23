const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const URL  = process.env.DATABASE
const connection = async() =>{
   try{
      await mongoose.connect(URL,{useUnifiedTopology:true ,useNewUrlParser:true})
      console.log(`databse connected `)
   }catch(error){
      console.log("Error while Creating DataBase",error)
   }
}

module.exports = connection