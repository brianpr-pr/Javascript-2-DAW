document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("enviar").addEventListener("click", () => {
        if(checkearTodasCasillas(document.querySelectorAll('fieldset'))){
            let numRespuestasCorrectas = mostrarResultados(document.querySelectorAll('fieldset'));
            document.getElementById("respuesta").innerHTML = "Formulario enviado correctamente.\nPuntuacion: [" + numRespuestasCorrectas + "/10]";
            document.getElementById("respuesta").style.color = "black";
        } else{
           document.getElementById("respuesta").innerHTML = "No has respondido a todas las preguntas.";
           document.getElementById("respuesta").style.color = "red"; 
        }
    })
});

function mostrarResultados(allFieldsets){
    let respuestasCorrectas = 0;

    allFieldsets.forEach(element => {            
        Array.from(element.children).forEach(child => {
            if(child.tagName === "INPUT"){
                if(child.checked){
                    if(!comprobarRespuestas(element.id, child.id)){
                        document.querySelector("#"+element.id + " img").src = "./iconos/cruz.png"; 
                    } else{
                        document.querySelector("#"+element.id + " img").src = "./iconos/tick.png";
                        respuestasCorrectas++;
                    }
                }
            }
        });
    });
    return respuestasCorrectas;
}

function comprobarRespuestas(fieldsetId, inputId){
    switch(fieldsetId){
        case "pregunta-1":
            if(inputId === "beth"){
                return true;
            }
            return false;

        case "pregunta-2":
            if(inputId === "jerry"){
                return true;
            }
            return false;

        case "pregunta-3":
            if(inputId === "roiland"){
                return true;
            }
            return false;

        case "pregunta-4":
            if(inputId === "ocho"){
                return true;
            }
            return false;

        case "pregunta-5":
            if(inputId === "cienciaFiccion"){
                return true;
            }
            return false;

        case "pregunta-6":
            if(inputId === "sanchez"){
                return true;
            }
            return false;

        case "pregunta-7":
            if(inputId === "portalGun"){
                return true;
            }
            return false;

        case "pregunta-8":
            if(inputId === "tierraC137"){
                return true;
            }
            return false;

        case "pregunta-9":
            if(inputId === "pencilvester"){
                return true;
            }
            return false;

        case "pregunta-10":
            if(inputId === "serAzul"){
                return true;
            }
            return false;
    }
}

function checkearTodasCasillas(allFieldsets){
    let allFieldsetChecked = true;
    
    allFieldsets.forEach(element => {
            let checkInput = false;
            
            Array.from(element.children).forEach(child => {
                if(child.tagName === "INPUT"){
                    if(child.checked){
                        checkInput = true;
                    }
                }
            });

            if(!checkInput){
                allFieldsetChecked  = false;
            }
        });

        return allFieldsetChecked;
}