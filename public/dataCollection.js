// ===== Data collection =============================================================================================================================================================
// fetch("/oo")
//     .then(response => response.blob())
//     .then(data => {
//         console.log("test test")
//         console.log(data)
//     })
//     .catch(err => {
//         console.log(err)
const delay = ms => new Promise(res => setTimeout(res, ms));
// ===== Tracking searched items =====
let searchedAlready = {
    priority: {value: 0, skip: []},
    set: {value: 0, skip: []},
    bomb: {value: 0, skip: []},
    rocks: {value: 0, skip: []},
    bar: {value: 0, skip: []}
}

// function createTemplateItems(number){
//         for(let i = 0; i < number; i++){
//             const template = document.querySelector("#grid-item-template")
//             const the_content = template.content.cloneNode(true)
//             document.querySelector(".grid-container").appendChild(the_content)
//         }
//     }
// ===== Creating product item with data
async function loadDataIntoItem(dataName, dataPrice, category, dataDescription){
    // Grab the first unloaded element
    const template = document.querySelector("#grid-item-template")
    const the_content = template.content.cloneNode(true)
    // Add src that requests image from server
    let str = dataName
    str = str.replace(/\s/g, '-')
    the_content.querySelector("img").src = `/product/${str}`
    // the_content.querySelector("img").loading = "lazy"
    // add the other attributes
    the_content.querySelector("div").setAttribute('data-description', dataDescription)
    the_content.querySelector("div").classList.remove("unloaded")
    the_content.querySelector("h5").innerHTML = "<span class='price'>"+dataPrice + "</span><br><span class='product-name'>"+dataName+"</span>"
    // Store each element in list or multiple lists based on category
    // dataSettings.storedElements.all.push(the_content)
    // category.forEach(element => {
    //     dataSettings.storedElements[element].push(the_content)
    //     if(element == "priority"){
    //         dataSettings.storedElements.all = dataSettings.storedElements.all.filter(item => item !== the_content)
    //     }
    // })
    document.querySelector(".grid-container").appendChild(the_content)
    let hii = document.querySelector(".grid-container").children[document.querySelector(".grid-container").childElementCount - 1]
    hii.querySelector("img").addEventListener("load", () =>{
        hii.querySelector(".loader").style.display = "none"
        // hii.style.border = "none"
    })
    category.forEach(element => {
        // console.log(element)
        hii.classList.add(`${element}`)
    })
    if(dataSettings.filter != "priority"){
        if(!hii.classList.contains(`${dataSettings.filter}`)){
            hii.classList.add("filter-hide")
        }
    }
    

   
    
    // console.log(dataName)
    // console.log(category)
    // console.log(dataSettings.storedElements)
    // function to update(new data collected make sure all lists are appended), same function in filter
    // console.log(dataSettings.storedElements)
//    updateGrid()
}

// ===== Collect a data item based on parameters =====
async function dataCollection(filter, filterNumber, filterMax){
    // Add tracking to data list
    Object.values(searchedAlready)[filterNumber].value++
    // Check to see if potential search is already in grid
    if(((Object.values(searchedAlready)[filterNumber].skip).includes(Object.values(searchedAlready)[filterNumber].value)) == false){
        // Fetch the item
        dataSettings.dataCollected++
        await fetch(`item/${filter}/${Object.values(searchedAlready)[filterNumber].value -1}`)
        .then(response => response.json())
        .then(response => {
            // For each filter check for duplicate and add to corresponding list
            for(let i = 0; i < dataSettings.numberOfFilters; i++){
                if(response.position[i] >= Object.values(searchedAlready)[i].value + 1){
                    Object.values(searchedAlready)[i].skip.push(response.position[i])
                }
            }
            // If window loaded then add product, else add event listener to call it on load
            if(document.readyState == "complete"){
                loadDataIntoItem(response.name, response.price, response.category, response.description)
            }else{
                window.addEventListener("load", () => {
                    loadDataIntoItem(response.name, response.price, response.category, response.description)
                })
            }
        })
        .catch(err => console.log(err))
    }else{
        // If item is known duplicate then don't fetch and remove duplicate index
        let value = Object.values(searchedAlready)[filterNumber].value
        let arr = Object.values(searchedAlready)[filterNumber].skip
        Object.values(searchedAlready)[filterNumber].skip = arr.filter(item => item !== value)
        // if the skipped item was the last then dont call
        if(Object.values(searchedAlready)[filterNumber].value != filterMax){
            // dataCollection(filter, filterNumber, filterMax)
        }
    }
}

// Main async function that runs untill all needed data collected

    // Get product category totals
fetch("/totals")
    .then(response => response.json())
    .then(data => {
        // createTemplateItems(data.total)
        dataSettings.maximums.total = data.total
        dataSettings.maximums.priority = data.priority
        dataSettings.maximums.set = data.set
        dataSettings.maximums.bomb = data.bomb
        dataSettings.maximums.rocks = data.rocks
        dataSettings.maximums.bar = data.bar
    })
    .then(() => {
        gettingAlltheProducts()
    })
    .catch(err => {
        console.log(err)
    })

async function gettingAlltheProducts(){
    // Fetch relevent data based on filter
    async function roundRobin(first, second, third, forth, num1, num2, num3, num4){
        if(Object.values(searchedAlready)[num1].value != dataSettings.maximums[first]  && dataSettings.maximums[first] != null){
            await dataCollection(first, num1, dataSettings.maximums[first])
        }
        if(Object.values(searchedAlready)[num2].value != dataSettings.maximums[second]  && dataSettings.maximums[second] != null){
            await dataCollection(second, num2, dataSettings.maximums[second])
        }
        if(Object.values(searchedAlready)[num3].value != dataSettings.maximums[third]  && dataSettings.maximums[third] != null){
            await dataCollection(third, num3, dataSettings.maximums[third])
        }
        if(Object.values(searchedAlready)[num4].value != dataSettings.maximums[forth]  && dataSettings.maximums[forth] != null){
            await dataCollection(forth, num4, dataSettings.maximums[forth])
        }
    }
    while(dataSettings.dataCollected != dataSettings.maximums.total){
        // await delay(3000)
        switch(dataSettings.filter) {
            case "priority":
                if(Object.values(searchedAlready)[0].value != dataSettings.maximums.priority  && dataSettings.maximums.priority != null){
                    await dataCollection("priority", 0, dataSettings.maximums.priority)
                }else{
                    await roundRobin("set", "bomb", "rocks", "bar", 1, 2, 3, 4)
                }
                // console.log(dataSettings.dataCollected)
                break;
            case "set":
                if(Object.values(searchedAlready)[1].value != dataSettings.maximums.set  && dataSettings.maximums.set != null){
                    await dataCollection("set", 1, dataSettings.maximums.set)
                }else{
                    await roundRobin("priority", "bomb", "rocks", "bar", 0, 2, 3, 4)
                }
                // console.log(dataSettings.dataCollected)
                break;
            case "bomb":
                if(Object.values(searchedAlready)[2].value != dataSettings.maximums.bomb  && dataSettings.maximums.bomb != null){
                    await dataCollection("bomb", 2, dataSettings.maximums.bomb)
                }else{
                    await roundRobin("priority", "set", "rocks", "bar", 0, 1, 3, 4)
                }
                // console.log(dataSettings.dataCollected)
                break;
            case "rocks":
                if(Object.values(searchedAlready)[3].value != dataSettings.maximums.rocks  && dataSettings.maximums.rocks != null){
                    await dataCollection("rocks", 3, dataSettings.maximums.rocks)
                }else{
                    await roundRobin("priority", "set", "bomb", "bar", 0, 1, 2, 4)
                }
                // console.log(dataSettings.dataCollected)
                break;
            case "bar":
                if(Object.values(searchedAlready)[4].value != dataSettings.maximums.bar  && dataSettings.maximums.bar != null){
                    await dataCollection("bar", 4, dataSettings.maximums.bar)
                }else{
                    await roundRobin("priority", "set", "bomb", "rocks", 0, 1, 2, 3)
                }
                // console.log(dataSettings.dataCollected)
                break;
        }
    }
}

console.log("fix duplicate callback function")
// const delay = ms => new Promise(res => setTimeout(res, ms));
// async function hhg(){
//     for(let i = 0; i<40; i++){
//         mainFunction()
//     }
// }
// hhg()
// if(document.readyState == "complete"){
//     for(let i = 0; i < 22; i++){
//         const template = document.querySelector("#grid-item-template")
//         const the_content = template.content.cloneNode(true)
//         // the_content.querySelector("img").src = items[0].image
//         document.querySelector(".grid-container").appendChild(the_content)
//     }
// }else{
//     window.addEventListener("load", () => {
//         for(let i = 0; i < 22; i++){
//             const template = document.querySelector("#grid-item-template")
//             const the_content = template.content.cloneNode(true)
//             // the_content.querySelector("img").src = items[0].image
//             document.querySelector(".grid-container").appendChild(the_content)
//         }
//     })
// }

// load more = +40 to 'number to load' and true = false
// load selected filter first then load 
// DataCollectionSettings = {
//     // filter: [completed, number to load(based on total of category), data index for that folder, backlog of data(if all = true)]
//     priority: [true, 80, 90, 10],
//     sets: [true, 40, 45, 5],
//     bombs: [false, 80, 20, 0],
//     rocks: [false, 40, 0, 0],
//     barsSalts: [false, 40, 39, 0]
// }
// ==== Initial data collection ===
// data includes Name, Price, image url
// check is content is saved on local storage?
// get data name, check if its in local storage if no then fetch the rest, if yes then dont.
// fetch data based on filter then go back to all? how does it know it hasnt been there already?
// go one by one and remember the index, when filter is clicked then only get relevant data once finished go back to index and go again??
// default:  load 40 items, then check if 40 items of the next category have been loaded if not load one, round robin
// filter: clicked

// === Grid items ===
// if user is near footer then spawn grid items with a function that demand data
// preload images

// === Images ===
// iamge folder not with user, put link in img href tag to server
// depending on image size depends on server image request eg: mobile/web

// === Misc ===
// pre load fonts
// defer css or maybe seperate product listings in seperate file

// what about searching?
