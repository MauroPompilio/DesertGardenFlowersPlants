// --------------------- PORTFOLIO --------------------
function cargarImagen(url_imagen){
    let url_img = JSON.parse(url_imagen)

    let imagen = document.createElement("img")
    imagen.src = url_img.message
    
    articulos = document.querySelectorAll("article")
    articulos.forEach(articulo => {
        if (articulo.children[0].childElementCount == 1)
            articulo.children[0].appendChild(imagen)
    })
}

function cargarPortfolio(){
    //Obtener los artículos
    let articulos = document.querySelectorAll("article")

    //Por cada artículo
    articulos.forEach(articulo => {
        ajax("get", "https://dog.ceo/api/breeds/image/random",
           cargarImagen)
    })

}

function cargarUsuarios(){
    ajax("get", "http://jsonplaceholder.typicode.com/users",
          generarTabla)
}

function cargarListado(){
    ajax("get","listado.html",cargarPagina)
}

function generarTabla(datos_json) {
    let usuarios = JSON.parse(datos_json)
    let fragmento = document.createDocumentFragment()
    let propiedades = ["name","username","address.city",
    "address.geo.lat","address.geo.lng"]
    /*
    <tr>
        <td>nombre</td>
        <td>usuario</td>
        <td>ciudad</td>
        <td>lat</td>
        <td>long</td>
    </tr>
    */
    usuarios.forEach(usuario =>{
        let tr = document.createElement("tr")
        propiedades.forEach(propiedad => {
            let td = document.createElement("td")
            let valor
            let sub_props = propiedad.split(".")

            valor = usuario
            sub_props.forEach(una_sub_prop =>{
                valor = valor[una_sub_prop]
            })

            td.innerText = valor
            tr.appendChild(td)
        })
        fragmento.appendChild(tr)
    })
    let cuerpo = document.getElementById("cuerpoTabla")
    
    for(i=cuerpo.children.length-1; i >= 0; i--){
        cuerpo.children[i].parentNode.removeChild(cuerpo.children[i])
    }
    //cuerpo.innerHTML = ""

    document.getElementById("cuerpoTabla").appendChild(fragmento)
}


// --------------------- DESCARGAR --------------------
function cargarImagenDownload(datos){
    let url = URL.createObjectURL(datos)
    console.log(url)

    let img = document.createElement("img")
    img.classList.add("miniaturas")
    img.src = url

    let descargar = document.createElement("button")
    descargar.innerText = "Descargar"
    descargar.addEventListener("click", e => {
        let a = document.createElement("a")
//vector[indice]  --> meses[0]
        let fecha = new Date()
        let hash = fecha.getFullYear().toString()+
                   fecha.getMonth().toString()+
                   fecha.getDate().toString()+
                    fecha.getHours().toString()+
                    fecha.getMinutes().toString()+
                    fecha.getSeconds().toString()
        a.download = "Imagen" + hash
        a.href = url
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    })

    let main = document.querySelector("main")
    main.appendChild(img)
    main.appendChild(descargar)

    //Crear elemento
    //document.createElement("<etiqueta>")         --> Obligatorio
    //Opcionales
    //    <creado>.<propiedad> = <valor>           --> id/src/href/innerText
    //    <creado>.addEventListener(......)        --> Agregar eventos
    //    <creado>.classList.add("<clase css>")    --> Agregar clase
    //    <creado>.classList.toggle("<clase css>") --> Agregar/Quitar clase
    //<elemento existente>.appendChild(<creado>)   --> Obligatorio

    //Si tengo que agregar varios, generalmente en un bucle
    // fragmento = document.createDocumentFragment()
    // Hago todo lo anterior
    // fragmento.appendChild(<creado>)
    //<elemento existente>.appendChild(<fragmento>)
}

function agregarLinks(datos){
    let nombres_imagenes = JSON.parse(datos)
    let fragmento = document.createDocumentFragment()

    nombres_imagenes.forEach(imagen => {
        let link = document.createElement("a")
        link.href = "./Imagenes/" + imagen
        link.innerText = imagen
        
        link.addEventListener("click", e => {
            e.preventDefault()

            ajax("get",e.target.href, cargarImagenDownload, "blob")
        })
        fragmento.appendChild(link)
    })
    document.querySelector("#archivos-descargar").appendChild(fragmento)
}

function cargarDownload(){
    ajax("get","imagenes.html", agregarLinks)
}

function cargarDescargaImagenes(){
    ajax("get","download.html",cargarPagina)
}



// --------------------- HOME --------------------
let imagen = document.querySelector("img")

if(imagen.complete)
    ajax("get", "home.html", cargarPagina)
else
    imagen.addEventListener("load", e => {
        ajax("get", "home.html",cargarPagina)
    })