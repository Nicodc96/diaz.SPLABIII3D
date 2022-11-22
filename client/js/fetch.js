const URL = "http://localhost:3000/mascotas";

const getEntidades = async (divSpinner) => {
    try{
        setSpinner(divSpinner, "../assets/loading.gif");
        const res = await fetch(URL);
        if (!res.ok){
            throw new Error(`${res.status}-${res.statusText}`);
        }
        const data = res.json();
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
        const res = await fetch(URL + `/${id}`);
        if (!res.ok){
            throw new Error(`${res.status}-${res.statusText}`);
        }
        return res.json();
    } catch(err){
        console.error(err.message);
    }finally{
        clearSpinner(divSpinner);
    }
}

const createEntidad = async (divSpinner, entidad) => {
    try{
        setSpinner(divSpinner, "../assets/loading.gif");
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(entidad)
        });
        if (!res.ok){
            throw new Error(`${res.status}-${res.statusText}`);
        }
        return res.json();
    } catch(err){
        console.error(err.message);
    }finally{
        clearSpinner(divSpinner);
    }
}

const updateEntidad = async (divSpinner, entidad) => {
    try{
        setSpinner(divSpinner, "../assets/loading.gif");
        const res = await fetch(URL + `/${entidad.id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(entidad)
        });
        if (!res.ok){
            throw new Error(`${res.status}-${res.statusText}`);
        }
        return res.json();
    } catch(err){
        console.error(err.message);
    }finally{
        clearSpinner(divSpinner);
    }
}

const deleteEntidad = async (divSpinner, id) => {
    try{
        setSpinner(divSpinner, "../assets/loading.gif");
        const res = await fetch(URL + `/${id}`, {
            method: "DELETE"
        });
        if (!res.ok){
            throw new Error(`${res.status}-${res.statusText}`);
        }
        return res.json();
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