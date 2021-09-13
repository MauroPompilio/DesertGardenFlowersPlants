function activarMenu(){
    let lista = document.querySelector("#listaMenu")
        //if(lista.style.left)
    //    lista.style.left = ''
    //else
    //    lista.style.left = '0px'
    lista.classList.toggle("menuVisible")
}

let menu = document.querySelector(".material-icons") 
menu.addEventListener("click", e => {
    activarMenu()
})
