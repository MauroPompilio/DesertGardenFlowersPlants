function guardarHistorial(datos, url)
{
    history.pushState(datos, "", "") //url
}

window.addEventListener("popstate", e => {
    cargarPagina(e.state)
})