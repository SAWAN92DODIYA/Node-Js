const User = require("../models/user");

async function handleGetAllUser(req,res){

  const allUser = await User.find({});
  return res.json(allUser);
}

async function handleGetUserById(req,res){
  const user = await User.findById(req.params.id);
 
  if(!user) return res.status(404).json({error:"user not found"});
  return res.json(user);
}

async function handleDeleteUserById(req,res){
  if (!req.params.id)
    {
      return res.json({message: "user id not present"})
    }
  
    deleteUser = await User.findByIdAndDelete(req.params.id);
  
    if(deleteUser){
      return res.json({ status: "success", message: `User with id ${req.params.id} deleted` })
    } else {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
}

async function handleCreateUser(req,res){
  const body = req.body;
  if(
    !body || 
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.user_name
  ){
    return res.status(404).json({msg: "All "})
  }
  
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    user_name: body.user_name
  })
  console.log("result",result);
  return res.status(201).json({msg: "success" ,id: result._id});
}

async function handleUpdateUserById(req,res){
  await User.findByIdAndUpdate(req.params.id,{last_name: "update"});
  return res.json({status: "Success"});
}

module.exports = {
  handleGetAllUser,
  handleGetUserById,
  handleDeleteUserById,
  handleCreateUser,
  handleUpdateUserById,
}