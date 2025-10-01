// HTML Elements Id
const formElementId = document.getElementById('form');
const alturaElementId = document.getElementById("altura");
const pesoElementId = document.getElementById("peso");
const enviarElementId = document.getElementById("enviar");
const listaElementoId = document.querySelector('ul');
// Variables para comprobar si el formulario es correcto
let alturaCorrecta = 0, pesoCorrecto = 0;

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
    if(alturaCorrecta && pesoCorrecto){
        let alturaMetros = alturaCorrecta / 100;
        let resultado = pesoCorrecto / (alturaMetros*alturaMetros);
        let listElementNumber;
        if(resultado < 16){
            listElementNumber = 0;
        }else if(resultado > 16 && resultado <= 16.99){
            listElementNumber = 1;
        }else if(resultado > 17 && resultado <= 18.49){
            listElementNumber = 2;
        }else if(resultado > 18.50 && resultado <= 24.99){
            listElementNumber = 3;
        }else if(resultado > 25 && resultado <= 29.99){
            listElementNumber = 4;
        }else if(resultado > 30 && resultado <= 34.99){
            listElementNumber = 5;
        }else if(resultado > 35 && resultado <= 40){
            listElementNumber = 6;
        }else if(resultado > 40){
            listElementNumber = 7;
        }

        listaElementoId.children[listElementNumber].style.color="green";

    } else{
        alert('Porfavor corriga los errores antes de enviar el formulario');
    }
});

alturaElementId.addEventListener("input", event => {
    alturaCorrecta = checkValue(parseInt(event.target.value), alturaElementId);
});

pesoElementId.addEventListener("input", event => {
    pesoCorrecto = checkValue(parseInt(event.target.value), pesoElementId);
});