const express = require("express");

const app = express();

const PORT = 8001;

const urlRoutes = require("./routes/url");
const {connectMongoDb} = require("./connection");

connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(()=>{console.log("MongoDb Connected!")});


app.use(express.json());

app.use('/url',urlRoutes);
app.listen(PORT,() =>{ console.log(`server started at PORT: ${PORT}`)} );