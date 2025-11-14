document.addEventListener("DOMContentLoaded", () => {
    let pareja = [];
    rellenarTabla();

    document.querySelectorAll("div").forEach(div => {
        div.addEventListener("click", event => {
            //Arreglar if statement
            event.target.style.backgroundColor="orange";
            if(event.target.children[0]){
                event.target.children[0].style.display="block";
                pareja.push([event.target, event.target.children[0].src.split("/").pop()]);
            }

            if(pareja.length > 1){
                if(pareja[0][1] === pareja[1][1]){
                   pareja[0][0].style.backgroundColor = "green";
                   pareja[1][0].style.backgroundColor = "green";
                   document.getElementById("resultado").innerHTML = parseInt(document.getElementById("resultado").innerHTML) + 1; 
                } else{
                    pareja[0][0].style.backgroundColor = "blue";
                    pareja[1][0].style.backgroundColor = "blue";
                    instancia1 = pareja[0][0].children[0];
                    instancia2 = pareja[1][0].children[0]; 
                    setTimeout( () => {
                        instancia1.style.display = "none";
                        instancia2.style.display = "none";
                    }, 1000);
                }
                pareja = [];
            }
        });
    });
})

function rellenarTabla(){
    let arrPersonajes = mezclar(["homer.png","homer.png","marge.png", "marge.png", "bart.png", "bart.png", "milhouse.png", "milhouse.png", "frink.png", "frink.png", "lisa.png", "lisa.png"]);
    document.querySelectorAll("img").forEach((img, i) => {
        img.src = "./personajes/" + arrPersonajes[i];
    });
}

function mezclar(arrPersonajes){
    let arrMezcladoPersonajes = [];
    let limite  = arrPersonajes.length-1;
    let contador = arrPersonajes.length;
    for(let i = 0; i < contador; i++){
        indice = Math.floor( Math.random() * limite);
        arrMezcladoPersonajes.push(arrPersonajes[indice]);
        arrPersonajes.splice(indice, 1);
        limite--;
    }
    return arrMezcladoPersonajes;
}