const express = require("express");
const app = express();
const fs = require("fs");
const Port = 8000;
const users = require("./MOCK_DATA.json")

// routes 

app.use(express.urlencoded({extended: false}));

app.get("/api/users",(req, res)=>{
  return res.json(users);
});

app.get("/users",(req,res)=>{
  const html = `<ul> ${users.map((user)=> `<li> ${user.first_name}</li>`).join("")}</ul>`
  return res.send(html)
})

app.get("/api/users/:id",(req,res)=>{
  const id = Number(req.params.id);
  const user = users.find((user)=> user.id === id);
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
  

app.post("/api/users",(req,res)=>{
  const body = req.body;
  users.push({...body ,id: users.length + 1});
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    return res.json({status: "success",id: users.length});
  });

})

app.patch("/api/users/:id",(req,res)=>{
  
})

app.delete("/api/users/:id",(req,res)=>{

})


app.listen(Port,()=> console.log("Server is Running.."));