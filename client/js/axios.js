const URL = "http://localhost:3000/mascotas";
/* No olvidar adjuntar el script de axios */
// <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

const getEntidades = async (divSpinner) => {
    try{
        setSpinner(divSpinner, "../assets/loading.gif");
        const { data } = await axios(URL);
        return data;
    } catch(err){
        console.error(err.message);
    }finally{
        clearSpinner(divSpinner);
    }
}
const getEntidad = async (divSpinner, id) => {
    try{
        setSpinner(divSpinner, "../assets/loading.gif");
        const { data } = await axios(URL + `/${id}`);
        return data;
    } catch(err){
        console.error(err.message);
    }finally{
        clearSpinner(divSpinner);
    }
}

const createEntidad = async (divSpinner, entidad) => {
    try{
        setSpinner(divSpinner, "../assets/loading.gif");
        const { data } = await axios(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            data: JSON.stringify(entidad)
        });
        return data;
    } catch(err){
        console.error(err.message);
    }finally{
        clearSpinner(divSpinner);
    }
}

const updateEntidad = async (divSpinner, entidad) => {
    try{
        setSpinner(divSpinner, "../assets/loading.gif");
        const { data } = await axios(URL + `/${entidad.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
              },
            data: JSON.stringify(entidad)
        });
        return data;
    } catch(err){
        console.error(err.message);
    }finally{
        clearSpinner(divSpinner);
    }
}

const deleteEntidad = async (divSpinner, id) => {
    try{
        setSpinner(divSpinner, "../assets/loading.gif");
        const res = await axios.delete(URL + `/${id}`);
        return res;
    } catch(err){
        console.error(err.message);
    }finally{
        clearSpinner(divSpinner);
    }
}

// Spinner

const setSpinner = (div, src) => {
    const $spinner = document.createElement("img");
    $spinner.setAttribute("src", src);
    $spinner.setAttribute("alt", "spinner");
    $spinner.setAttribute("height", "64px");
    $spinner.setAttribute("width", "64px");
    $spinner.setAttribute("id", "imgSpinner");
    div.appendChild($spinner);
}

const clearSpinner = (div) => {
    if (div != null){
        div.removeChild(document.querySelector("#imgSpinner"));
    }
}

export { getEntidades, getEntidad, createEntidad, updateEntidad, deleteEntidad }