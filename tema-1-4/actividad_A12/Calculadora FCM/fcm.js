// HTML Elements Id
const formElementId = document.getElementById('form');
const edadId = document.getElementById('edad');
const generoMascId = document.getElementById('masculino');
const generoFemId = document.getElementById('femenino');
const enviarElementId = document.getElementById("enviar");
const listaElementoId = document.querySelector('ul');

// Variables para comprobar si el formulario es correcto
let edadVal= 0, genero = '';
function checkValue(value, elementId){
    if(value <= 0){
        elementId.style.borderColor = "red";
        return 0;
    } else{
        elementId.style.borderColor = "";
        return value;
    };
}

formElementId.addEventListener("submit", event => {
    event.preventDefault();
    if(edadVal && genero){
        let frecuencia = 0;
        if(genero == "masculino"){
            frecuencia = 220;
        } else{
            frecuencia = 226;
        }
        frecuencia -= edadVal;

        Array.from(listaElementoId.children).forEach( (element, index) => {
            let porcentageMinimo = 0, porcentageMaximo = 0;
            switch(index){
                case 0: 
                    porcentageMinimo = frecuencia / 100 * 60;
                    porcentageMaximo = frecuencia / 100 * 70;
                    break;
                case 1: 
                    porcentageMinimo = frecuencia / 100 * 70;
                    porcentageMaximo = frecuencia / 100 * 80;
                    break;
                case 2: 
                    porcentageMinimo = frecuencia / 100 * 80;
                    porcentageMaximo = frecuencia / 100 * 90;
                    break;
                case 3: 
                    porcentageMinimo = frecuencia / 100 * 90;
                    porcentageMaximo = frecuencia;
                    break;
            }
            element.querySelector('span').innerHTML = porcentageMinimo + "-" + porcentageMaximo;
        });
    }else{
        window.alert("Error porfavor rellene todos los datos");
    }
    
});

edadId.addEventListener("input", event => {
    edadVal = checkValue(parseInt(event.target.value), edadId);
});

generoMascId.addEventListener("change", event => {
    genero = "masculino";
});

generoFemId.addEventListener("change", event => {
    genero = "femenino";
});