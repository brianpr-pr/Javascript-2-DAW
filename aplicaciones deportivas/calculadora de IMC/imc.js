// HTML Elements Id
const formElementId = document.getElementById('form');
const alturaElementId = document.getElementById("altura");
const pesoElementId = document.getElementById("peso");
const enviarElementId = document.getElementById("enviar");
const mensajeExito = document.getElementById('exit');
// Variables para comprobar si el formulario es correcto
let alturaCorrecta = false, pesoCorrecto = false;

function checkValue(value, elementId){
    if(value <= 0){
        elementId.style.borderColor = "red";
        return false;
    } else{
        elementId.style.borderColor = "";
        return true;
    };
}

formElementId.addEventListener("submit", event => {
    if(alturaCorrecta && pesoCorrecto){
        mensajeExito.innerHTML = "Formulario enviado correctamente";
    } else{
        event.preventDefault();
        alert('Porfavor corriga los errores antes de enviar el formulario');
    }
});

alturaElementId.addEventListener("input", event => {
    checkValue(event.target.value, alturaElementId);
});

pesoElementId.addEventListener("input", event => {
    checkValue(event.target.value, pesoElementId);
});

enviarElementId.addEventListener("click", event =>{
    console.log("Se ha enviado el formulario");
})