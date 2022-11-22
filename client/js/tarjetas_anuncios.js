import { crearTarjeta } from "./card.js";
import { getEntidades } from "./ajax.js";

const $contenedorTarjetas = document.querySelector("#contenedor-tarjetas");
const entidades = await getEntidades($contenedorTarjetas);

if (entidades.length > 0){
    entidades.forEach((mascota) => {
        $contenedorTarjetas.appendChild(crearTarjeta(mascota.titulo,
            mascota.descripcion,
            mascota.precio.toString(),
            mascota.raza,
            mascota.fecha_de_nacimiento,
            mascota.vacuna));
    });
}
