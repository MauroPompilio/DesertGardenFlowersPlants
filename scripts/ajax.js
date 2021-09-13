function ajax(metodo, url, callback, tipo){
    let xhr = new XMLHttpRequest
    xhr.open(metodo, url)

    if(tipo)
        xhr.responseType = tipo

    xhr.addEventListener("load", e => {
        let xhr = e.target
        if(xhr.status == 200)
        {
            guardarHistorial(xhr.response, url)
            callback(xhr.response, url)
        }
    })
    xhr.send()
}

// Cargar contenido en el main de la página
// Datos --> Contenido HTML
// pagina --> Nombre url para casos especiales
function cargarPagina(datos, pagina){
    let main = document.querySelector("main")
    main.innerHTML = datos
    switch (true)
    {
        case pagina.includes("portfolio"):
            cargarPortfolio()
            break;
        case pagina.includes("download"):
            cargarDownload()
            break
    }
}

let main = document.querySelector("main")
main.addEventListener("click", e => {
    let id_elemento
    switch (e.target.tagName.toLowerCase())
    {
        case "article":
        case "button":
            id_elemento = e.target.id;
            break
        case "div":
            id_elemento = e.target.parentNode.id
            break
        case "footer":
        case "img":
            id_elemento = e.target.parentNode.parentNode.id
            break
    }

    if(id_elemento)
    {
        switch (id_elemento) {
            case "listado":
                cargarListado()
                break
            case "descargar-archivos":
                cargarDescargaImagenes()
                break
            case "cargar":
                cargarUsuarios()
                break
        }
    }
})    
