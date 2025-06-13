
const fs = require("fs");

const express = require("express")

const app = express();

app.get('/',(req,res) =>{
  return res.send("Home page");
})

app.get('/about',(req,res) =>{
  return res.send("Hii "+ req.query.username);
})

app.listen(8000, () => console.log("Server Started!"));