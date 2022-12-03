// document.querySelector(".cart-container").appendChild(localStorage.getItem("test"))
// console.log(localStorage.getItem("test"))
for (let i =0; i < localStorage.length; i++){
    savedData = JSON.parse(localStorage.getItem(localStorage.key(i)))
    // (localStorage.getItem(localStorage.key(i))).trim()
    // document.querySelector(".cart-container").appendChild(document.createElement("div"))
    const template = document.querySelector("template")
    const content = template.content.cloneNode(true)
    const cartItemList = document.querySelector(".cart-container")
    content.querySelector(".cart-info-name").innerText = savedData[0]
    content.querySelector("img").src = savedData[1]
    content.querySelector(".cart-info-price").innerText = savedData[2]
    cartItemList.insertBefore(content, cartItemList.children[0])
    // console.log(localStorage.getItem(localStorage.entries(i)))
}
// console.log(localStorage.length)
// const newNode = document.createElement("li");
// const textNode = document.createTextNode("Water");
// newNode.appendChild(textNode);

// const list = document.getElementById("myList");
// list.insertBefore(newNode, list.children[0]);
let removeButtons = document.querySelectorAll(".remove")
for(let i = 0; i < removeButtons.length; i++){
    removeButtons[i].addEventListener("click", (e)=>{
        e.target.parentElement.parentElement.parentElement.remove()
        findName = e.target.parentElement.parentElement.querySelector(".cart-info-name").innerText
        localStorage.removeItem(JSON.stringify(findName))
        updateCartTotal()
    })
}
function updateCartTotal(){
    let total = 0
    let items = document.querySelectorAll(".cart-item")
    for(let i = 0; i<items.length; i++){
        let price = parseFloat(items[i].querySelector(".cart-info-price").innerText.replace("£",""))
        let quantity = items[i].querySelector(".quantity").value
        if (isNaN(quantity) || quantity <= 0 || quantity > 20){
            items[i].querySelector(".quantity").value = 1
            quantity = 1
        }
        total = total + (price * quantity)
    }
    document.querySelector(".total").innerText = "£" + total.toFixed(2)
}
updateCartTotal()

function quantityChangePlus(e){
    let one = parseInt(e.parentNode.querySelector(".quantity").value)
    if(one >= 1 && one < 20){
        e.parentNode.querySelector(".quantity").value = one + 1
        updateCartTotal()
    }
}
function quantityChangeMinus(e){
    let one = parseInt(e.parentNode.querySelector(".quantity").value)
    if(one > 1 && one <= 20){
        e.parentNode.querySelector(".quantity").value = one - 1
        updateCartTotal()
    }
}