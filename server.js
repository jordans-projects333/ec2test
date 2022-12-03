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
const { data } = require("./data.js")
Object.keys(data).forEach((i, index) => {
    server.get(`/item${index}`, (req, res) => {
        res.json(data[i])
    })
    server.get(`/product${index}`, (req, res) => {
        res.render('product', {
            name: data[i].name,
            image: data[i].image,
            price: data[i].price,
            category: data[i].category[0]
        })
    });
})

// ===== Image serving =====
Object.keys(data).forEach((i) => {
    let str = data[i].name
    str = str.replace(/\s/g, '-')
    server.get(`/product/${str}`, (req, res) =>{
        res.sendFile(__dirname + `/serverImages/${data[i].image}`)
    })
})

totalData = {total: 0, priority: 0, set: 0, bomb: 0, rocks: 0, bar: 0}
totalData.total = Object.keys(data).length
Object.keys(data).forEach(i =>{
    data[i].category.forEach((i) => {
        switch(i){
            case "priority":
                totalData.priority++
                break
            case "set":
                totalData.set++
                break
            case "bomb":
                totalData.bomb++
                break
            case "rocks":
                totalData.rocks++
                break
            case "bar":
                totalData.bar++
                break
        }
    })
})
Object.keys(totalData).forEach(i =>{
    if(totalData[i] == 0){
        totalData[i] = null
    }
})

server.get("/totals", (req, res) => {
    res.json(totalData)
})
// Give data a position
Object.keys(data).forEach((i) => {
    data[i].position = [0, 0, 0, 0, 0]
})

// Set those positions
function setPositions(filter, place){
    let tempCount = 1
    Object.keys(data).forEach((i, index) => {
        data[i].category.forEach((event) => {
            if(event == filter){
                if(data[i].category.length > 0){
                    data[i].position[place] = tempCount
                    tempCount++
                }
            }
        })
    })
}
setPositions("priority", 0)
setPositions("set", 1)
setPositions("bomb", 2)
setPositions("rocks", 3)
setPositions("bar", 4)
// console.log(data)

function setRequests(filter){
    let tempCount = 0
    Object.keys(data).forEach((i, index) => {
        data[i].category.forEach((event) => {
            if(event == filter){
                server.get(`/item/${filter}/${tempCount}`, (req, res) => {
                    res.json(data[i])
                })
                tempCount++
            }
        })
    })
}
setRequests("priority")
setRequests("set")
setRequests("bomb")
setRequests("rocks")
setRequests("bar")
console.log(totalData)
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