let menuHamburguer = document.querySelector(".menu-hamburguer");
let menu = document.querySelector(".menu")
let btnFechar = document.getElementById("sair")

console.log(menuHamburguer)

menuHamburguer.addEventListener("click", () =>{
    menu.classList.add("ativo")
})

btnFechar.addEventListener("click", () =>{
    menu.classList.remove("ativo")
})

