let dataSettings = {
    allDataCollected : false,
    dataCollected : 0,
    allDataAppended: false,
    filter: "priority",
    numberOfFilters: 5,
    maximums: {
        priority: null,
        set: null,
        bomb: null,
        rocks: null,
        bar: null,
        total: null
    },
    storedElements: {
        priority: [],
        set: [],
        bomb: [],
        rocks: [],
        bar: [],
        all: []
    }
}

const numberOfRows = 2
items = []

function createTemplateItems(number){
    for(let i = 0; i < number; i++){
        const template = document.querySelector("#grid-item-template")
        const the_content = template.content.cloneNode(true)
        document.querySelector(".grid-container").appendChild(the_content)
    }
}

function updateGridValue(filter){
    let ttt = filter.cloneNode(true)
    document.querySelector(".grid-container").appendChild(ttt)
    let ee = document.querySelector(".grid-container").childElementCount - 1
    document.querySelector(".grid-container").children[ee].querySelector("img").addEventListener("load", () =>{
        document.querySelector(".grid-container").children[ee].querySelector(".loader").style.display = "none"
        document.querySelector(".grid-container").children[ee].style.border = "none"
    })
}

function updateGrid(){
    let tempCounter = 0
    switch(dataSettings.filter){
        case "priority":
            if(document.querySelector(".grid-container").childElementCount - 1 != dataSettings.storedElements.all.length){
                updateGridValue(dataSettings.storedElements.all[document.querySelector(".grid-container").childElementCount-1])
            }
            break
        case "set":
            console.log("part 2")
            if(document.querySelector(".grid-container").childElementCount - 1 < dataSettings.storedElements.set.length){
                updateGridValue(dataSettings.storedElements.set[document.querySelector(".grid-container").childElementCount-1])
            }
            break
        case "bomb":
            console.log("launghed")
            if(document.querySelector(".grid-container").childElementCount - 1 < dataSettings.storedElements.bomb.length){
                // console.log(dataSettings.storedElements.bomb)
                updateGridValue(dataSettings.storedElements.bomb[document.querySelector(".grid-container").childElementCount-1])
            }
            break
        case "rocks":
            if(document.querySelector(".grid-container").childElementCount - 1 < dataSettings.storedElements.rocks.length){
                updateGridValue(dataSettings.storedElements.rocks[document.querySelector(".grid-container").childElementCount-1])
            }
            break
        case "bar":
            if(document.querySelector(".grid-container").childElementCount - 1 < dataSettings.storedElements.bar.length){
                updateGridValue(dataSettings.storedElements.bar[document.querySelector(".grid-container").childElementCount-1])
            }
            break
    }
}
// bomb while loop is infinite
// priority needs to load everything(roundrobin)

//9504