const express = require("express");

const {connectMongoDb} = require("./connection")
const {logReqRes} = require("./middlewares");

const userRouter = require("./routes/user");

const Port = 8000;
const app = express();

// DB connection
connectMongoDb("mongodb://127.0.0.1:27017/instagram").then(()=>{
  console.log("MongoDB Connected!")
});


// Middleware - Plugin 
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"));

// routes
app.use("/api/users",userRouter);

app.listen(Port,()=> console.log("Server is Running.."));