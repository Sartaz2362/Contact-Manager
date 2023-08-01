const express = require("express");
const cors = require("cors")
const connection = require("./Database/Connection")
const Router = require("./routes/routes.js")
const path = require("path")

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors())

// app.use(express.static(path.join(__dirname,"../client/build")))

// app.get("*", (req,resp)=>{
//     resp.sendFile(path.join(__dirname,"../client/public/index.html"))
// })

connection();

app.use("/",Router);
const PORT=4000

app.listen(PORT,(req,resp)=>{
    console.log(`your server is running on ${PORT}`)
})