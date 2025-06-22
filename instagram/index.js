const express = require("express");
const app = express();
const mongoose = require('mongoose');
const fs = require("fs");
const Port = 8000;

const { type } = require("os");
const { timeStamp } = require("console");

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/instagram")
  .then(()=> console.log("MongoDB Connected"))
  .catch((error) => console.log("Mongo Error",error));

// schema
const userSchema = new mongoose.Schema({
  first_name:{
    type: String,
    require: true
  },
  last_name: {
    type: String,
    require: true
  },
  email:{
    type: String,
    require: true,
    unique: true
  },
  user_name:{
    type: String
  }
  },{timestamps: true})

const User = mongoose.model('user',userSchema);

// Middleware - Plugin 
app.use(express.urlencoded({extended: false}));

// app.use((req,res,next)=>{
//   console.log("Hello form middleware 1");
//   next(); 
// });

// routes 
app.get("/api/users",async (req, res)=>{
  const allUser = await User.find({});
  return res.json(allUser);
});

app.get("/users",async (req,res)=>{
  const allUser = await User.find({});
  const html = `<ul> ${allUser.map((user)=> `<li> ${user.first_name}</li>`).join("")}</ul>`
  return res.send(html)
})

app.get("/api/users/:id",async (req,res)=>{
  const user = await User.findById(req.params.id);
 
  if(!user) return res.status(404).json({error:"user not found"});
  return res.json(user);
})

// app
//   .route("/api/users/:id")
//   .get((req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=> user.id === id);
//     return res.json(user);
//   })
//   .patch((req,res)=>{
//     return res.json({status: "panding"});
//   })
//   .delete((req,res)=>{
//     return res.json({status: "panding"});
//   })
  

app.post("/api/users",async (req,res)=>{
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
  return res.status(201).json({msg: "success"});
})

app.patch("/api/users/:id",(req,res)=>{
  const id = Number(req.params.id);
  const index = users.findIndex((user) => user.id === id);
  if(index === -1)
  {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  users[index] ={
    ...users[index],
    ...req.body
  };

  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>
  {
    if(err)
    {
      return res.status(500).json({status:"error",message:"Failed to update user"});
    }

    return res.json({status:"success",data: users[index]});
  })
  
})

app.delete("/api/users/:id",async (req,res)=>{
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
});


app.listen(Port,()=> console.log("Server is Running.."));