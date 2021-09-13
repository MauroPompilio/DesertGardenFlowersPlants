
let links = document.querySelectorAll("a")
links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault()
        ajax("get",e.target.href, cargarPagina)
    })
    link.addEventListener("click", activarMenu)
})