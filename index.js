const http = require('http')
const path = require("path")
const fs = require("fs")

// ===== works for html only =====
// http.createServer((req, res) => {
//   if(req.url === '/'){
//     fs.readFile(path.join(__dirname, "public", "index.html"), (err, content) => {
//       if(err) throw err;
//       res.writeHead(200, {'Content-Type': 'text/html'})
//       res.end(content)
//     })
//   }
// }).listen(80, () => console.log("server listening on port 80"))

http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
  let extname = path.extname(filePath)
  let contentType = "text/html"
  switch(extname){
    case '.js':
      contentType = 'text/javascript'
      break
    case '.css':
      contentType = 'text/css'
      break
    case '.json':
      contentType = 'application/json'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.jpg':
      contentType = 'image/jpg'
      break
  }
  // read
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if(err.code == 'ENOENT'){
        //page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content)=> {
          res.writeHead(200, {'Content-Type': 'text/html'})
          res.end(content, 'utf8')
        })
      }else{
        //server error
        res.writeHead(500)
        res.end('sever error')
      }
    }else{
      res.writeHead(200, {'Content-Type': contentType})
      res.end(content, 'utf8')
    }
  })
}).listen(80, () => console.log("server listening on port 80"))