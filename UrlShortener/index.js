const express = require("express");
const path = require("path");

const app = express();


const PORT = 8001;

const urlRoutes = require("./routes/url");
const staticRoutes = require("./routes/static_router");
const URL = require("./models/url");
const {connectMongoDb} = require("./connection");

connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(()=>{console.log("MongoDb Connected!")});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/url',urlRoutes);
app.use('/',staticRoutes);

app.get('/:shortId',async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortId
    },
    {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    }
 );
 res.redirect(entry.redirectURL);
});

app.listen(PORT,() =>{ console.log(`server started at PORT: ${PORT}`)} );