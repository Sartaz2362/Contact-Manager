const express = require("express"); // Before ES-6
// import { Express } from "express"; // ES-6
const cors = require("cors")
const connection = require("./Database/Connection")
const Router = require("./routes/routes.js")
const path = require("path")
const dotenv = require("dotenv")

const app = express();

//initialize the dotenv
dotenv.config()

app.use(express.json());
app.use(express.urlencoded());
app.use(cors())

// app.use(express.static(path.join(__dirname,"../client/build")))

// app.get("*", (req,resp)=>{
//     resp.sendFile(path.join(__dirname,"../client/public/index.html"))
// })

connection();

app.use("/",Router);
const PORT= process.env.PORT

app.listen(PORT,(req,resp)=>{
    console.log(`your server is running`)
})