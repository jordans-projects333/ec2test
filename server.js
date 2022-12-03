const request = require("request")

const express = require('express')
const bodyParser = require('body-parser')

const path = require('path')
const server = express()
server.use(express.static(path.join(__dirname, 'public')))
const PORT = process.env.PORT || 80
const cors = require("cors")
server.use(cors())

server.set('views', path.join(__dirname, '/public'));
server.set('view engine', 'ejs');

server.get('/', (req, res) => {
    res.render("index")
})
// server.get('/', (req, res) => {
//     res.send('hello')
// })

// === Body Parser Middleware ===
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
// === Send message Api ===


// Sends data if requested containing data.js object items
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
// data will be fetch and totals added, 1 item fetched = +1 set and +1 bomb, it cant fetch a duplicate if one /itemBomb is a list and the first item gets popped?
// what if http exist in a popable list?
// if data was sent already then send next in line?
// ================================================================================================================================================================================================
// Set totals for each category
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
// positions and routes added, add ignore lists to each filter and delete if ignore value is lower than current amount loaded
// ===========================================================================================================================================================================================================
// Webscraping salesNumber from Etsy


// server.post('/send', (req, res) => {
//     console.log(req.body.phoneNumber)
//     const to = req.body.phoneNumber
//     const text = req.body.message
//     // nexmo.message.sendSms(from, to, text)
    
//     const output = `
//         <p>I am testing emailing</p>
//         <h3>Begin test</h3>
//         <ul>
//             <li>Name: ${req.body.message}</li>
//         </ul>
//     `;
//     const options = {
//         from: "jordanroberts333@icloud.com",
//         to: "sarah.burdett93@gmail.com",
//         subject: "Test email",
//         html: output
//         // text: "test 2"
//     }
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         service: "icloud",
//         auth: {
//             user: "jordanroberts333icloud.com",
//             pass: "li",
//         },
//     });

//     // send mail with defined transport object
//     transporter.sendMail(options, (err, info)=>{
//         if(err){
//             console.log(err)
//             return
//         }
//         console.log("sent: "+info.response)
//     });
// })
// 447984858002


// const output = `
// <p>I am testing emailing</p>
// <h3>Begin test</h3>
// <ul>
//     <li>Name: Jordan</li>
// </ul>
// `;
// const options = {
// from: "jordanroberts654@outlook.com",
// to: "sarah.burdett93@gmail.com",
// subject: "Milk please",
// // html: output
// text: "go get milk"
// }
// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
// service: "outlook",
// auth: {
//     user: "jordanroberts654@outlook.com",
//     pass: "Jaws12345",
// },
// });

// // send mail with defined transport object
// transporter.sendMail(options, (err, info)=>{
// if(err){
//     console.log(err)
//     return
// }
// console.log("sent: "+info.response)
// });
// ====================================
server.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)});