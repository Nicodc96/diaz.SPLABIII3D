const validarCampoVacio = (arrayInputs) => {
    let validado = true;
    if (Array.isArray(arrayInputs)){
        for(let i = 0; i < arrayInputs.length; i++){
            if (arrayInputs[i].value == ""){
                return false;
            }
        }
    }
    return validado;
}

const validarCaracteres = (arrayInputs) => {
    let validado = false;
    if (Array.isArray(arrayInputs)){
        for(let i = 0; i < arrayInputs.length; i++){
            if (arrayInputs[i].value > 25) return validado;
        }
        validado = true;
    }    
    return validado;
}

const validarPrecio = (input) => {
    let valor = parseFloat(input.value);
    return valor >= 0 && valor <= 50000;
}

const validarSelect = (input) => {
    return input.options.selectedIndex == 1 || input.options.selectedIndex == 2;
}

const validarFecha = (arrayInputs) => {
    let validado = false;
    let patron = /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/;
    if (Array.isArray(arrayInputs)){
        for(let i = 0; i < arrayInputs.length; i++){
            if (!patron.test(arrayInputs[i].value)) break;
        }
        validado = true;
    }    
    return validado;
}

export {validarCampoVacio, validarCaracteres, validarPrecio, validarSelect, validarFecha};