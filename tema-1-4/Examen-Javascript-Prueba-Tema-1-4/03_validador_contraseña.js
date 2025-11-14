const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Ingrese su contraseña, esta debe de tener 8 caracteres como mínimo además debe de contar con una mayuscula, una minúscula y uno de los caracteres especiales siguientes ((!@#$%)\n", (password) => {
    resultado = validatePassword(password);
    console.log("Resultado: " + resultado.valido);

    if(resultado.errores.length > 0){
        console.log("Errores: " + resultado.errores);
    }
    rl.close();
})

function validatePassword(password){
    let valido = true;
    let errores = [];

    if(password.length < 8){
        valido = false;
        errores.push("Es necesario que la contraseña tenga minimo 8 caracteres.");
    }

    if(!/[A-Z]/.test(password)){
        valido = false;
        errores.push("Es necesario que la contraseña tenga minimo 1 caracter en mayuscula.");
    }

    if(!/[a-z]/.test(password)){
        valido = false;
        errores.push("Es necesario que la contraseña tenga minimo 1 caracter en minúscula.");
    }

    if(!/[!@#$%]/.test(password)){
        valido = false;
        errores.push("Es necesario que la contraseña tenga minimo 1 caracteres especial ((!@#$%).");
    }

    return {valido, errores};
}