document.addEventListener('DOMContentLoaded', ev => {
    const contenedorMensaje = document.getElementById('resultado');
    
    document.getElementById('enviar').addEventListener('click', event => {    
    contenedorMensaje.innerText = '';

        try{
            const fecha = validarFecha( document.getElementById('fecha').value );
            const cocinero = validarCocinero( document.getElementById('cocinero').value );
            const destinatario = validarDestinatario( document.getElementById('destinatario').value );
            const peso = validarPeso( parseInt( document.getElementById('peso').value ) );
            const composicion = validarComposicion( document.getElementById('composicion').value );
            const numeroCuenta = validarNumeroCuenta( document.getElementById('numeroCuenta').value );

            contenedorMensaje.innerText = 'Envio de datos correcto.';
            contenedorMensaje.style.color = 'green';
        } catch(error){
            contenedorMensaje.innerText = error.message;
            contenedorMensaje.style.color = 'red';
        }

        document.getElementById('fecha').value = '';
        document.getElementById('cocinero').value = '';
        document.getElementById('destinatario').value = '';
        document.getElementById('peso').value = '';
        document.getElementById('composicion').value = '';
        document.getElementById('numeroCuenta').value = '';
    });
});

function validarFecha(fecha){    
    if(typeof(fecha) !== 'string'){
        throw new Error('Error fatal: Fallo al insertar fecha, intentelo de nuevo.');
    }

    const fechaArr = fecha.split(/-/);

    if(!/[0-9]{4,4}/.test(fechaArr[0])){
        throw new Error('Error fatal: Formato invalido en el año.');
    }

    if(parseInt(fechaArr[1]) <= 0 
    || parseInt(fechaArr[1]) > 12
    || !/[0-9]{2,2}/.test(fechaArr[1])){
        throw new Error('Error fatal: Formato invalido en el mes.');
    }

    if(parseInt(fechaArr[2]) <= 0 
    || parseInt(fechaArr[2]) > 31
    || !/[0-9]{2,2}/.test(fechaArr[2])){
        throw new Error('Error fatal: Formato invalido en el dia.');
    }

    return [true, fecha];   
}

function validarCocinero(cocinero){
    if(typeof(cocinero) !== 'string'){
        throw new Error('Error fatal: Fallo al insertar nombre clave del cocinero, intentelo de nuevo.');
    }

    const regex = /^[A-Z]{2}[*?¿'·$%&()=]{1}\d{4}$/;

    if(!regex.test(cocinero)){
        throw new Error('Error fatal: Formato invalido.');
    }

    return [true, cocinero];
}

function validarDestinatario(destinatario){
    if(!/^[A-Z]{2,3}[_]{1,1}[a-z]{1,}[:]{1,1}[0-9]{4,4}$/.test(destinatario)){
        throw new Error('Error fatal: Formato invalido en el destinatario.');
    }
    return [true, destinatario];
}

function validarPeso(peso){
    if(peso < 100 || peso > 5000){
        throw new Error('Error fatal: El peso debe estar entre 100 y 5000 gramos.');
    }
    return [true, cocinero];
}

function validarComposicion(composicion){
    if(typeof(composicion) !== 'string'){
        throw new Error('Error fatal: Fallo al insertar la composicion, intentelo de nuevo.');
    }
        
    const arrComposicion = composicion.split('g');

    Array.from(arrComposicion[0]).forEach(element => {
        const regexCantidadGramos = /^[0-9]$/;
        if(!regexCantidadGramos.test(element)){
            throw new Error('Error fatal: Formato invalido en la composicion.');
        }
    });

    const regexConjuntos = /^[A-Z]{1,2}[0-9]{0,1}[A-Z]{1,2}[0-9]{0,1}$/;
    if(!regexConjuntos.test(arrComposicion[1])){
        throw new Error('Error fatal: Formato invalido en la composicion.');
    }

    return [true, composicion];
}

function validarNumeroCuenta(numeroCuenta){
    const abecedary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lettersRegex = /^[A-Z]{1,1}$/;
    const hyphenRegex = /^[-]{1,1}$/;
    const numbersRegex = /^[0-9]{1,1}$/;

    if(numeroCuenta.length !== 20){
        throw new Error('Error: The account number have to be 20 characters length.');
    }

    if(!/^[A-Z]{1,1}$/.test( numeroCuenta.substring(0,1) )){
        throw new Error('Error: 1st character have to be a uppercase letter.');
    }
    
    let firstDigit = 1 + [...abecedary].indexOf( numeroCuenta.substring(0,1));

    if(!lettersRegex.test( numeroCuenta.substring(1,2) )){
        throw new Error('Error: 2nd character have to be a uppercase letter.');
    }

    let secondDigit = 1 + [...abecedary].indexOf( numeroCuenta.substring(1,2));

    if(!numbersRegex.test( numeroCuenta.substring(2,3) ) ){
        throw new Error('Error: 3rd character have to be a number.');
    }

    if(!numbersRegex.test( numeroCuenta.substring(3,4) ) ){
        throw new Error('Error: 4th character have to be a number.');
    }

    if(!hyphenRegex.test( numeroCuenta.substring(4,5) )){
        throw new Error('Error: 5th character have to be a hyphen.');
    }

    let result = firstDigit + secondDigit;

    let twoDigits = (result > 10) ? result.toString() : '0' + result.toString();
    if(numeroCuenta.substring(2,4) !== twoDigits){
        throw new Error('Error: 3th and 4th characters are not correct.');
    }

    [...numeroCuenta.substring(5,17)].forEach( (char,index) => {
        if(!numbersRegex.test(char) ){
            throw new Error('Error: From '+ (index+6) +'th character have to be number.');
        }
    });
    
    if(!hyphenRegex.test( numeroCuenta.substring(17,18) ) ){
        throw new Error('Error: 18th character have to be a hyphen.');
    }

    if(checkControlDigit([...numeroCuenta.substring(5,11)]) != numeroCuenta.substring(18,19)){
        throw new Error('Error: 19th character is not correct.');
    }

    if(checkControlDigit([...numeroCuenta.substring(11,17)]) != numeroCuenta.substring(19,20)){
        throw new Error('Error: 20th character is not correct.');
    }
    
    return [true, numeroCuenta.replaceAll(/-/g, '')];
}

function checkControlDigit(arrNumbers){
    let firstHalfControlDigits = 0;
    arrNumbers.forEach( (char) => {
        firstHalfControlDigits += parseInt(char);    
    });

    return Math.floor(firstHalfControlDigits / 6).toString();
}
