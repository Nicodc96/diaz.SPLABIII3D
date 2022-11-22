import crearTabla from "./tablaDinamica.js";
import Anuncio_Mascota from "./anuncio_mascota.js";
import { validarPrecio, validarCampoVacio, validarCaracteres, validarSelect, validarFecha } from "./validaciones.js";
import { createEntidad, updateEntidad, deleteEntidad } from "./fetch.js";
import { getEntidades} from "./ajax.js";

const anuncioContainer = document.querySelector("#entidad-container");
const entidades = await getEntidades(anuncioContainer);
const $container = document.querySelector("#lista-entidades");
const $containerFiltered = document.querySelector("#lista-entidades-filtros");
const $frmEntidad = document.forms[0];
const $titulo = document.querySelector("#titulo-form");
const $btnSubmit = document.querySelector("#btnGuardar");
const $btnEliminar = document.querySelector("#btnEliminar");
const $selectFiltro = document.querySelector("#selectRaza");
const $inputPromedio = document.querySelector("#txtPromedio");

actualizarTabla(entidades, $container); 
actualizarTablaFiltros(entidades, $containerFiltered);
limpiarForm();

$frmEntidad.addEventListener("submit", (e) => {
    e.preventDefault();
    /* Modificar los datos segun los inputs */
    const { txtId, txtTitulo, txtDescripcion, rdoMascota, txtPrecio, txtRaza, txtFechaNacimiento, selectVacuna} = $frmEntidad;
    console.log(txtId.value);
    console.log(validarCaracteres([txtTitulo, txtDescripcion]));
    if (validarCampoVacio([txtTitulo, txtDescripcion, txtPrecio, txtRaza, txtFechaNacimiento]) 
    && validarFecha([txtFechaNacimiento]) 
    && validarSelect(selectVacuna) 
    && validarPrecio(txtPrecio)
    && validarCaracteres([txtTitulo, txtDescripcion])){
        if (txtId.value == ""){
            const newMascota = new Anuncio_Mascota(
                Anuncio_Mascota.ultimoIdRegistrado(entidades) + 1, txtTitulo.value, txtDescripcion.value, txtPrecio.value,
                rdoMascota.value, txtRaza.value, txtFechaNacimiento.value, selectVacuna.options[selectVacuna.selectedIndex].text
                );
            if (Anuncio_Mascota.verificarAnuncioRegistrado(entidades, newMascota) == -1){
                createEntidad(anuncioContainer, newMascota).then(() => {
                    limpiarForm();
                });
            }
        } else{
            const mascotaModify = new Anuncio_Mascota(txtId.value, txtTitulo.value, txtDescripcion.value, txtPrecio.value,
                rdoMascota.value, txtRaza.value, txtFechaNacimiento.value, selectVacuna.options[selectVacuna.selectedIndex].text);
                console.log(Anuncio_Mascota.modificarElemento(entidades, mascotaModify));
            if (Anuncio_Mascota.modificarElemento(entidades, mascotaModify)){
                updateEntidad(anuncioContainer, mascotaModify).then(() => {
                    limpiarForm();
                })                
            }
        }
    } else{
        alert("Error en los datos. Verifique que:\n- No haya espacios vacíos\n- Titulo y la descripción tengan como máximo 25 caracteres\n- Precio mínimo $0, máximo $50.000\n- Haber seleccionado un opción de vacuna\n- Fecha correcta dd/mm/aaaa, ceros incluídos (separados por '-' o '/')");
    }
    actualizarTabla(entidades, $container);
});

window.addEventListener("click", (e) => {
    const target = e.target;
    if(target.matches("tr td")){
        const id = e.target.parentElement.dataset.id;
        cargarDatos(Anuncio_Mascota.obtenerElemento(entidades, parseInt(id)));
        $titulo.textContent = "Modificación del anuncio";
        $btnEliminar.removeAttribute("disabled");
        $btnSubmit.setAttribute("id", "btnModificar");
        $btnSubmit.childNodes[2].textContent = "Modificar";
    }
    if (target.matches("#btnCancelar") || target.parentElement.matches("#btnCancelar")){
        e.preventDefault();
        limpiarForm();
    }
    if (target.matches("#btnEliminar") || target.parentElement.matches("#btnEliminar")){
        deleteEntidad(anuncioContainer, $frmEntidad.txtId.value).then(() => {
            limpiarForm();
            actualizarTabla(entidades, $container);
        });
    }
});

$selectFiltro.addEventListener("change", () => {
    let opcionSeleccionada = $selectFiltro.options.selectedIndex;    
    let listaFiltrada = [];
    switch(opcionSeleccionada){
        case 1:
            listaFiltrada = entidades.filter((entidad) => entidad.tipo.toLowerCase() == "gato" || entidad.tipo.toLowerCase() == "perro");
            $inputPromedio.value = (listaFiltrada.reduce((prev, actual) => {
                return parseInt(prev) + parseInt(actual.precio.split("$")[1]);
            }, 0) / listaFiltrada.length).toFixed(2);
            break;
            break;
        case 2:
            listaFiltrada = entidades.filter((entidad) => entidad.tipo.toLowerCase() == "gato");
            $inputPromedio.value = (listaFiltrada.reduce((prev, actual) => {
                return parseInt(prev) + parseInt(actual.precio.split("$")[1]);
            }, 0) / listaFiltrada.length).toFixed(2);
            break;
        case 3:
            listaFiltrada = entidades.filter((entidad) => entidad.tipo.toLowerCase() == "perro");
            $inputPromedio.value = (listaFiltrada.reduce((prev, actual) => {
                return parseInt(prev) + parseInt(actual.precio.split("$")[1]);
            }, 0) / listaFiltrada.length).toFixed(2);
            break;
        default:
            listaFiltrada = entidades;
            $inputPromedio.value = "0.00";
    }
    actualizarTablaFiltros(listaFiltrada, $containerFiltered);
    actualizarCheckBoxes(checkBoxesTabla);
    checkBoxControl(checkBoxesTabla);
});

/* Funciones para el formulario */
function cargarDatos(elemento){
    if (elemento instanceof Object){
        const { txtId, txtTitulo, txtDescripcion, rdoMascota, txtPrecio, txtRaza, txtFechaNacimiento, selectVacuna} = $frmEntidad;
        txtId.value = elemento.id;
        txtTitulo.value = elemento.titulo;
        txtDescripcion.value = elemento.descripcion;
        txtPrecio.value = elemento.precio.split("$")[1];
        rdoMascota.value = elemento.tipo;
        txtRaza.value = elemento.raza;
        txtFechaNacimiento.value = elemento.fecha_de_nacimiento;
        switch(elemento.vacuna.toLowerCase()){
            case "si":
                selectVacuna.options.selectedIndex = 1;
                break;
            case "no":
                selectVacuna.options.selectedIndex = 2;
                break;
        }
    } else{
        alert("El elemento seleccionado no es un anuncio!");
    }
}

function limpiarForm(){
    $titulo.textContent = "Complete el formulario según corresponda:";
    $btnSubmit.setAttribute("id", "btnGuardar");
    $btnSubmit.childNodes[2].textContent = "Guardar";
    $btnEliminar.setAttribute("disabled", "");
    $frmEntidad.reset();
    $frmEntidad.txtId.value = "";
    $selectFiltro.options.selectedIndex = 0;
    $inputPromedio.value = "0.00";
}

/* ------------------------------------------ */

/* Funciones para la tabla */

function actualizarTabla(lista, contenedor){
    if (contenedor != null){
        while(contenedor.hasChildNodes()){
            contenedor.removeChild(contenedor.firstElementChild);
        }
    }
    let data = document.querySelector("#lista-entidades");
    if (data){
        contenedor.appendChild(crearTabla(lista));
    }
}

function actualizarTablaFiltros(lista, contenedor){
    if (contenedor != null){
        while(contenedor.hasChildNodes()){
            contenedor.removeChild(contenedor.firstElementChild);
        }
    }
    let divLista = document.querySelector("#lista-entidades-filtros");
    if (divLista){
        contenedor.appendChild(crearTabla(lista));
    }
}

const checkBoxesTabla = [];
function actualizarCheckBoxes(lista){
    let $cabeceraTabla = document.querySelectorAll("#cabecera-tabla");
    while (lista.length > 0){
        lista.pop();
    }
    $cabeceraTabla.forEach((nodoCabecera) => {
        nodoCabecera.childNodes.forEach((th) => {
            th.childNodes.forEach((nodos) => {
                if (nodos.nodeName == "INPUT"){
                    lista.push(nodos);
                }
            })
        })
    });
}
actualizarCheckBoxes(checkBoxesTabla);
function checkBoxControl(lista){
    for (let i = 0; i < 8; i++){
        lista[i].addEventListener("change", () => {
            toggleColumnaSegunCheck(document.querySelector("#lista-entidades").firstElementChild, checkBoxesTabla[i].id);
        });
    }
    for (let i = 7; i < lista.length; i++){
        lista[i].addEventListener("change", () => {
            toggleColumnaSegunCheck(document.querySelector("#lista-entidades-filtros").firstElementChild, checkBoxesTabla[i].id);
        });
    }
}
checkBoxControl(checkBoxesTabla);

function toggleColumnaSegunCheck(tabla, nombre){
    switch(nombre){
        case "check-titulo":
            toggleColumna(tabla, 0);
            break;
        case "check-descripcion":
            toggleColumna(tabla, 1);
            break;
        case "check-precio":
            toggleColumna(tabla, 2);
            break;
        case "check-tipo":
            toggleColumna(tabla, 3);
            break;
        case "check-raza":
            toggleColumna(tabla, 4);
            break;
        case "check-fecha_de_nacimiento":
            toggleColumna(tabla, 5);
            break;
        case "check-vacuna":
            toggleColumna(tabla, 6);
        break;
    }
}

function toggleColumna(tabla, checkNum){
    for(let i = 1; i < tabla.rows.length; i++){
        let j = tabla.rows[i].cells;
        if (j[checkNum].style.display == "none"){
            j[checkNum].style.removeProperty("display");
        } else{
            j[checkNum].style.display = "none";
        }
    }
}
/* ------------------------------------------ */