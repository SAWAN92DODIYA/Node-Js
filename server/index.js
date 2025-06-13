const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url == "/favicon.ico")  return res.end();
  const log = `${Date.now()}: ${req.method}:${req.url} New Req Received\n`;
  const myUrl = url.parse(req.url,true);
  console.log(myUrl);
  console.log(myUrl.query.username);
  fs.appendFile("log.txt",log,(err,data) =>{
    switch(req.url){
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        res.end("I am Sawan");
        break;
      default:
        res.end("404 Not found");
      }
  });
})

myServer.listen(8000, () => {
  console.log("Server Started!")
});



/////////////////
const http = require("http");
const fs = require("fs");
const url = require("url");

function myHandler(req,res){
    if (req.url == "/favicon.ico")  return res.end();
    const log = `${Date.now()}: ${req.method}:${req.url} New Req Received\n`;
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);
    console.log(myUrl.query.username);
    fs.appendFile("log.txt",log,(err,data) =>{
      switch(req.url){
        case "/":
          res.end("HomePage");
          break;
        case "/about":
          res.end("I am Sawan");
          break;
        default:
          res.end("404 Not found");
      }
  })
}

const myServer = http.createServer(myHandler);

myServer.listen(8000, () => {
  console.log("Server Started!")
});

