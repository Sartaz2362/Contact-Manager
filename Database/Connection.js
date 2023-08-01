const mongoose = require("mongoose")

const URL = "mongodb+srv://contact:7sx7LfS1Zgb2anSP@cluster0.gfuzmle.mongodb.net/contact-manager?retryWrites=true&w=majority"

const connection = async() =>{
   try{
      await mongoose.connect(URL,{useUnifiedTopology:true ,useNewUrlParser:true})
      console.log(`databse connected on port ${URL}`)
   }catch(error){
      console.log("Error while Creating DataBase",error)
   }
}

module.exports = connection