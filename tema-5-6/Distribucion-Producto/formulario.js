document.addEventListener("DOMContentLoaded", ev => {
    document.getElementById("enviar").addEventListener("click", event => {
        console.log("Boton enviar pulsado.");
        
        try{
            const fecha = validarFecha( document.getElementById("fecha").value );
            const cocinero = validarCocinero( document.getElementById("cocinero").value ); 
            const destinatario = validarDestinatario( document.getElementById("destinatario").value );
            const peso = validarPeso( parseInt( document.getElementById("peso").value ) );
            const composicion = validarComposicion( document.getElementById("composicion").value );
            const numeroCuenta = validarNumeroCuenta( document.getElementById("numeroCuenta").value );

            /*
            if(fecha[0] && cocinero[0] && destinatario[0] && peso[0] && composicion[0] && numeroCuenta[0]){
                console.log("Envio correcto.");
            }*/
        } catch(error){
            console.log(error.message);
        }
    });
});

//Seguir trabajando en de que manera deberia de devolver los datos. para mostrar feedback
function validarFecha(fecha){    
    if(typeof(fecha) !== "string"){
        throw new Error("Error fatal: Fallo al insertar fecha, intentelo de nuevo.");
    }

    const fechaArr = fecha.split(/-/);

    if(!/[0-9]{4,4}/.test(fechaArr[0])){
        throw new Error("Error fatal: Formato invalido en el año.");
    }

    if(parseInt(fechaArr[1]) <= 0 
    || parseInt(fechaArr[1]) > 12
    || !/[0-9]{2,2}/.test(fechaArr[1])){
        throw new Error("Error fatal: Formato invalido en el mes.");
    }

    //Esto se podria mejorar comprobando que el número de días es igual o inferior al de ese mes concreto.
    if(parseInt(fechaArr[2]) <= 0 
    || parseInt(fechaArr[2]) > 31
    || !/[0-9]{2,2}/.test(fechaArr[2])){
        throw new Error("Error fatal: Formato invalido en el dia.");
    }

    return [true, fecha];   
}



function validarCocinero(cocinero){
    if(typeof(cocinero) !== "string"){
        throw new Error("Error fatal: Fallo al insertar nombre clave del cocinero, intentelo de nuevo.");
    }

    const regex = /^[A-Z]{2}[*?¿"·$%&()=]{1}\d{4}$/;

    if(!regex.test(cocinero)){
        throw new Error("Error fatal: Formato invalido.");
    }

    return [true, cocinero];
}

function validarDestinatario(destinatario){
    // !/^[A-Z]{2,3}_[a-z]{1,}[:]{1,1}[-9]{4,4}$/.
    if(!/^[A-Z]{2,3}[_]{1,1}[a-z]{1,}[:]{1,1}[0-9]{4,4}$/.test(destinatario)){
        throw new Error("Error fatal: Formato invalido en el destinatario.");
    }
    return [true, destinatario];
}

function validarPeso(peso){
    if(peso < 100 || peso > 5000){
        throw new Error("Error fatal: El peso debe estar entre 100 y 5000 gramos.");
    }
    return [true, cocinero];
}

function validarComposicion(composicion){
    if(typeof(composicion) !== "string"){
        throw new Error("Error fatal: Fallo al insertar la composicion, intentelo de nuevo.");
    }
        
    const arrComposicion = composicion.split("g");

    Array.from(arrComposicion[0]).forEach(element => {
        const regexCantidadGramos = /^[0-9]$/;
        if(!regexCantidadGramos.test(element)){
            throw new Error("Error fatal: Formato invalido en la composicion.");
        }
    });

    const regexConjuntos = /^[A-Z]{1,2}[0-9]{0,1}[A-Z]{1,2}[0-9]{0,1}$/;
    if(!regexConjuntos.test(arrComposicion[1])){
        throw new Error("Error fatal: Formato invalido en la composicion.");
    }

    return [true, composicion];
}

//Normally in a real application you wouldn't show an specific error to avoid security issues.
function validarNumeroCuenta(numeroCuenta){
    const abecedary = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lettersRegex = /^[A-Z]{1,1}$/;
    const hyphenRegex = /^[-]{1,1}$/;
    const numbersRegex = /^[0-9]{1,1}$/;

    if(numeroCuenta.length !== 21){
        throw new Error("Error: The account number have to be 21 characters length.");
    }
 

    if(!/^[A-Z]{1,1}$/.test( numeroCuenta.substring(0,1) )){
        throw new Error("Error: 1st character have to be a uppercase letter.");
    }

    let firstDigit = 1 + [...abecedary].indexOf( numeroCuenta.substring(0,1));

    if(!lettersRegex.test( numeroCuenta.substring(1,2) )){
        throw new Error("Error: 2nd character have to be a uppercase letter.");
    }

    let secondDigit = 1 + [...abecedary].indexOf( numeroCuenta.substring(1,2));
 
    if(!hyphenRegex.test(numeroCuenta.substring(2,3) ) ){
        throw new Error("Error: 3rd character have to be a hyphen.");
    }

    if(!numbersRegex.test( numeroCuenta.substring(3,4) ) ){
        throw new Error("Error: 4th character have to be a number.");
    }

    if(!numbersRegex.test( numeroCuenta.substring(4,5) ) ){
        throw new Error("Error: 5th character have to be a number.");
    }

    let result = firstDigit + secondDigit;

    let twoDigits = (result > 10) ? result.toString() : '0' + result.toString();

    if(numeroCuenta.substring(3,5) !== twoDigits){
        throw new Error("Error: 4th and 5th characters are not correct.");
    }

    if(!hyphenRegex.test( numeroCuenta.substring(5,6) ) ){
        throw new Error("Error: 6th character have to be a hyphen.");
    }

    [...numeroCuenta.substring(6,18)].forEach( (char,index) => {
        if(!numbersRegex.test(char) ){
            throw new Error("Error: From "+ (index+7) +"th character have to be number.");
        }
    });

    if(!hyphenRegex.test( numeroCuenta.substring(18,19) ) ){
        throw new Error("Error: 19th character have to be a hyphen.");
    }

    if(checkControlDigit([...numeroCuenta.substring(6,12)]) != numeroCuenta.substring(19,20)){
        throw new Error("Error: 20th character is not correct.");
    }

    if(checkControlDigit([...numeroCuenta.substring(12,18)]) != numeroCuenta.substring(20,21)){
        throw new Error("Error: 21th character is not correct.");
    }

    return [true, numeroCuenta.replaceAll(/-/g, '')];
}
//console.log(validarNumeroCuenta('AB-03-123456789012-34'));

function checkControlDigit(arrNumbers){
    let firstHalfControlDigits = 0;
    arrNumbers.forEach( (char) => {
        firstHalfControlDigits += parseInt(char);    
    });

    return Math.floor(firstHalfControlDigits / 6).toString();
}