// === Mobile navigation menu dropdown
document.querySelector('.mobile-nav-bar-container').addEventListener('click', () => {
    document.querySelector('.mobile-nav-bar-container').classList.toggle('active');
    document.querySelector('.navbar').classList.toggle('active');
});

document.querySelectorAll('.navbar-list-container a').forEach(n => n.
    addEventListener('click', () => {
        document.querySelector('.mobile-nav-bar-container').classList.remove('active');
        document.querySelector('.navbar').classList.remove('active');    
}));
// Shopping Cart
function addToTheCart(image, name, price){
    localStorage.setItem(JSON.stringify(name), JSON.stringify([name, image, price]))
    // document.querySelector(".cart-container").appendChild(document.createElement("div"))
}

// const delay = ms => new Promise(res => setTimeout(res, ms));
async function addedToCart(e){
    addedItemText = e.parentNode.querySelector("h4").innerText
    console.log(addedItemText)
    const templateItem = document.querySelector("#addToCartTemplate")
    const theContent = templateItem.content.cloneNode(true)
    theContent.querySelector("h3").innerText = addedItemText + " added to cart"
    let idNumber = Math.floor(Math.random() * (1 - 100000 + 1) + 1)
    theContent.querySelector(".addToCartPopUp").setAttribute("id", "j"+idNumber)
    document.body.append(theContent)
    await delay(10);
    document.querySelector(".addToCartPopUp").classList.add("fadeIn")
    await delay(1000);
    document.querySelector(".addToCartPopUp").classList.remove("fadeIn")
    await delay(4000);
    document.querySelector(`#j${idNumber}`).remove()

}

// document.querySelector('.grid-item').addEventListener("click", ()=>{
//     document.querySelector('.pop-up').style.display = "flex"
// })

// document.querySelectorAll(".grid-item").forEach((i, index) => {
//     i.addEventListener("click", ()=>{
//         fetch(`item${index}`)
//         .then(response => response.json())
//         .then(data => {
//             // console.log(data)
//             window.location = `/product${index}`
//             // document.querySelector("#product").innerHTML = data.name
//             // document.querySelector("#product").style.backgroundImage = "url("+data.image+")"
//         })
//         .catch(err => console.log(err))
//     })
// })


// window.onload = function() {
//     fetch(`item${currentProduct}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//             // window.location = "/product.html"
//             document.querySelector("#product").innerHTML = data.name
//             document.querySelector("#product").style.backgroundImage = "url("+data.image+")"
//         })
//   }
