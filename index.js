const http = require('http')
const path = require("path")
const fs = require("fs")

//create a server object:
http.createServer((req, res) => {
  if(req.url === '/'){
    fs.readFile(path.join(__dirname, "public", "index.html"), (err, content) => {
      if(err) throw err;
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end(content)
    })
  }
  // res.write(`${person.name}: fbi wanted`); //write a response to the client
  // res.end(); //end the response
}).listen(80, () => console.log("server listening on port 80")); //the server object listens on port 80