// const { updateOne } = require("../schema/contactSchema");
const Contact = require("../schema/contactSchema");
const User = require("../schema/userSchema");

// Post request for add data in DB
const addContact = async(req,resp) =>{
    try{
    var {name,phone,id} = req.body;
    name = name.trim()
 
    const user = await User.findById(id)
    const contact = await Contact.findOne({name})
    if(contact){
        resp.status(201).json({success:false,message:"This name is already saved"})
    }else{
        const newContact = new Contact({name,phone})
        const saved = await newContact.save();
        user.contact.push(saved)
        const {contact} = await user.save()
        resp.status(201).json({success:true,newContact:contact,message:"contact added"})
    }
    }catch(error){
        console.log(error)
        resp.status(409).json({message:error.message})
    }
}
module.exports = addContact

// Get Request for all data
const getContacts = async(req,resp)=>{
    try{
      const {contact} = await User.findById(req.params.id)
      resp.status(201).send(contact) 
    }catch(error){
        resp.status(409).json({message:"Error while finding data" , error})
    }
}
module.exports = getContacts


// Get request for Edit component
const getContactById = async(req,resp) =>{
    try{
      const {contact} = await User.findById(req.params.myId)
      const onecontact = contact.filter((item)=>item._id == req.params.id)
      resp.status(200).send({success:true,newContact:onecontact})
    }catch(error){
        resp.status(409).json({message:error.message})
    }
}
module.exports = getContactById

// Put request for Edit contact
const editContact = async(req,resp) =>{
    var {_id,name,phone} = req.body
    name = name.trim()
    try{
    const existname = await Contact.findOne({name})
    if(existname){
        resp.status(201).json({success:false,message:"This name is already saved"})
    } else {
    await Contact.findByIdAndUpdate(req.body.id,{name,phone})
    const me = await User.findOne({_id:req.params.myId})
    const contact = me.contact.map((item)=>{
        if(item._id === _id){
            item.name = name
            item.phone = phone
        }
        return item
    })
    await User.findByIdAndUpdate(req.params.myId,{contact})
     resp.status(201).json({success:true,message:"Contact Edit success"})
    }
    }catch(error){
        resp.status(409).json({message:error.message})
    }
}
module.exports = editContact

// delete Request for delete contact
const deleteContact = async(req,resp)=>{
    try{
     await Contact.findByIdAndDelete(req.params.id)
     const me = await User.findById(req.params.myId)
     me.contact = me.contact.filter((item)=> item._id!=req.params.id)
     await me.save();
     resp.status(201).json({success:true,newContact:me.contact,message:"contact Delete success"})
    }catch(error){
        resp.status(409).json({message:error.message})
    }
}
module.exports = deleteContact

module.exports = {
    addContact:addContact,
    getContacts:getContacts,
    getContactById:getContactById,
    editContact:editContact,
    deleteContact:deleteContact,
}