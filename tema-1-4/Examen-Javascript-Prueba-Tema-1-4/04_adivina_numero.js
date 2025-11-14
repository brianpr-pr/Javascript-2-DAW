import { createInterface } from 'readline';

// Create interface for input/output
let x = Math.round(Math.random() * 100);

console.log(x);

for(let i = 0; i < 7; i++){
    //Mostrar número de intentos restantes.
    console.log(`Le quedan ${7 - i} intentos para acertar`);
    
    //Insertar dato.
    let valorIn = await input();
    valorIn=parseInt(valorIn);

    //Comprobación de resultado con correspondiente output.
    if(valorIn === x){
        console.log(`Has acertado en el intento nº${i+1}`);
        break;
    }
    console.log("Incorrecto.");
    (valorIn > x) ? console.log("El número insertado es mayor.") : console.log("El número insertado es menor."); 
}

function input(){
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
        });

    return new Promise(resolve => rl.question("Inserte un número: ", respuesta => {
        rl.close();
        resolve(respuesta);
    }));
}