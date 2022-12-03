var http = require('http');
const person = require("./variable")

console.log(person)
//create a server object:
http.createServer(function (req, res) {
  res.write(`${person}: fbi wanted`); //write a response to the client
  res.end(); //end the response
}).listen(80); //the server object listens on port 80