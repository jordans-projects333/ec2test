document.getElementById('theform').addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(document.querySelector(".userEmail").value)
})