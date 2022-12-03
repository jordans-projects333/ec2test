var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('one small W for man, one fat W for mankind'); //write a response to the client
  res.end(); //end the response
}).listen(80); //the server object listens on port 80