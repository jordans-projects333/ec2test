// Filter sticks to navbar on scroll
// let filter = document.querySelector(".filter-wrapper")
// let filterPosition = document.querySelector(".filter")
// document.querySelector(".filter").style.height = filter.offsetHeight+"px"
// window.addEventListener('scroll',()=>{ 
//     let header = document.querySelector("header")
//     if(filterPosition.getBoundingClientRect().top <= header.getBoundingClientRect().bottom){
//         filter.classList.add("filter-sticky")



        

//     }else{
//         filter.classList.remove("filter-sticky")
//     }
// })

// === Filter slider 
// window.addEventListener("load", () => {
//     // THiS AINT WORKING
//     console.log("omg")
//     // loadDataIntoItem(response.name, response.price,response.image)
// });

function sliderPosition(position){
    let firstPosition = document.querySelector(".filter-wrapper").children[position].getBoundingClientRect().left
    let secondPosition = document.querySelector(".filter-wrapper").children[position].getBoundingClientRect().right
    let sliderwidth = (secondPosition - firstPosition)
    document.querySelector(".filter-slider").style.left = firstPosition - 10 +"px"
    document.querySelector(".filter-slider").style.width = sliderwidth + 15 + "px"
}

sliderPosition(0)
// let items = []
// Creating the product grid from data
function filterClick(e){
    // document.querySelector(".product-number").classList.remove("temp-spin")
    document.querySelectorAll(".grid-item").forEach((element)=> {
        element.classList.remove("filter-hide")
        if(!element.classList.contains("filter-hide")){
            element.classList.add("filter-hide")
        }
    })
    let slider = document.querySelector(".filter-slider")
    let total = (document.querySelector(".grid-container").childElementCount) -1
    document.querySelectorAll(".filter-item").forEach((item) => {
        // console.log(item)
        item.classList.remove("active-filter")
    })
    items.forEach((i)=>{
        eval(i.element).classList.remove("refreshAnimation")
    })
    // document.querySelector(".product-number").classList.remove("refreshAnimation")
    e.classList.add("active-filter")
    switch(e.querySelector(".filter-text").innerText) {
        case "All products":
            dataSettings.filter = "priority"
            sliderPosition(0)
            document.querySelectorAll(".grid-item").forEach((element)=> {
                // console.log(element)
                element.classList.remove("filter-hide")
            })
            // document.querySelector(".products-title").innerHTML = `Products<span class="product-number">(${dataSettings.maximums.total})</span>`
            break;
        case "Sets":
            dataSettings.filter = "set"
            sliderPosition(1)
            document.querySelectorAll(".grid-item").forEach((element)=> {
                // console.log(element)
                if(element.classList.contains("set")){
                    console.log("fired")
                    element.classList.remove("filter-hide")
                }
            })
            // document.querySelector(".products-title").innerHTML = `Products<span class="product-number">(${dataSettings.maximums.set})</span>`
            break
        case "Bath bombs":
            dataSettings.filter = "bomb"
            sliderPosition(2)
            document.querySelectorAll(".grid-item").forEach((element)=> {
                if(element.classList.contains("bomb")){
                    element.classList.remove("filter-hide")
                }
            })
            // document.querySelector(".products-title").innerHTML = `Products<span class="product-number">(${dataSettings.maximums.bomb})</span>`
            break;
        case "Rocks":
            dataSettings.filter = "rocks"
            sliderPosition(3)
            
            document.querySelectorAll(".grid-item").forEach((element)=> {
                if(element.classList.contains("rocks")){
                    element.classList.remove("filter-hide")
                }
            })
            // document.querySelector(".products-title").innerHTML = `Products<span class="product-number">(${dataSettings.maximums.rocks})</span>`
            break
        case "Bars/Salts":
            dataSettings.filter = "bar"
            sliderPosition(4)
            document.querySelectorAll(".grid-item").forEach((element)=> {
                if(element.classList.contains("bar")){
                    element.classList.remove("filter-hide")
                }
            })
            // document.querySelector(".products-title").innerHTML = `Products<span class="product-number">(${dataSettings.maximums.bar})</span>`
            break
        }
        // document.querySelector(".product-number").classList.add("temp-spin")
}

function getProduct(e){
    // Transition
    document.querySelector(".productInfoSection").classList.remove("slideOneOut")
    document.querySelector(".slideContent").classList.remove("slideTwoIn")
    document.querySelector(".productInfoSection").classList.add("slideOneIn")
    document.querySelector(".slideContent").classList.add("slideTwoOut")

    // Get data
    imageData = e.querySelector("img").src
    titleData = e.querySelector("h5").innerText
    descriptionData = e.getAttribute('data-description');
    document.querySelector(".product-image").src = imageData
    document.querySelector(".product-title").innerText = titleData
    document.querySelector(".product-description").innerText = descriptionData

    // Get Reviews
}
function backHome(){
    document.querySelector(".productInfoSection").classList.remove("slideOneIn")
    document.querySelector(".slideContent").classList.remove("slideTwoOut")
    document.querySelector(".productInfoSection").classList.add("slideOneOut")
    document.querySelector(".slideContent").classList.add("slideTwoIn")
}