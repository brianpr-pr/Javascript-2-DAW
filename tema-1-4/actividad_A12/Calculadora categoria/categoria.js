// HTML Elements Id
const formElementId = document.getElementById('form');
const edadElementId = document.getElementById("edad");
const enviarElementId = document.getElementById("enviar");
const listaElementoId = document.querySelector('ul');
// Variables para comprobar si el formulario es correcto
let edad = 0;

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
    let listNumber;
    if(edad > 0 && edad <= 4){
        listNumber = 0;
    } else if(edad >= 5 && edad <=6){
        listNumber = 1;
    } else if(edad >= 7 && edad <=8){
        listNumber = 2;
    }else if(edad >= 9 && edad <=10){
        listNumber = 3;
    }else if(edad >= 11 && edad <=12){
        listNumber = 4;
    }else if(edad >= 13 && edad <=14){
        listNumber = 5;
    }else if(edad >= 15 && edad <=16){
        listNumber = 6;
    }else if(edad >= 17 && edad <=18){
        listNumber = 7;
    }else if(edad >18){
        listNumber = 8;
    }else{
        window.alert('Porfavor introduzca una edad valida');
    }
    listaElementoId.children[listNumber].style.color = "green";
});

edadElementId.addEventListener("input", event => {
    edad = checkValue(parseInt(event.target.value), edadElementId);
});