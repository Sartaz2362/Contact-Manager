// const User = require("../schema/userSchema.js")
const User = require("../schema/userSchema");
const jwt = require("jsonwebtoken")

const Register = async(req,resp)=>{
    try{
    const {name,email,password} = req.body;
    const user = await User.findOne({email:email})

    if(user){
        resp.send({message:"User already exist"});
    }else{
    const newUSer = new User({name,email,password});
    const me = await newUSer.save();
    var token = await jwt.sign({_id:me._id},"sandeepkhariwal",{expiresIn:"7d"})
    delete me.password;
    resp.status(201).json({message:"User Registered Successfully",newUser:me,token});
    }
    }catch(error){
        console.log("Error while registering in DB",error)
        resp.status(409).json({message:error.message})
    }
}
module.exports = Register

const Login = async(req,resp)=>{
    const {email , password} = req.body;

    const user = await User.findOne({email})
    if(user){
        if(password === user.password){
            var token = await jwt.sign({_id:user._id},"sandeepkhariwal",{expiresIn:"7d"})
            resp.send({message:"Login Successfully" , newUser:user,token})
        }
        else{
            resp.send({message:"Invelid Email and Password"})
        }
    } else{
        resp.send({message:"User not Registered"})
    }
     
}
module.exports = Login

module.exports= {
    Register:Register,
    Login:Login,
}