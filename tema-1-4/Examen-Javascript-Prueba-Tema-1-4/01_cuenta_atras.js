let val = 30;

let idInterval = setInterval(()=>{
    console.log(`Quedan ${val} /segundos para finalizar el programa.`);
    val--;
    
    if(val <= 0){
        alert("Se acabo el tiempo.");
        clearInterval(idInterval);
        //Como manejar windows close?
        window.close();
    }

}, 1000);