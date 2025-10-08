class Edificio{
    calle = "";
    numero = "s/n";
    codigoPostal = 0;
    plantasEdificio = new Array();
    
    constructor(calle, numero = "s/n", codigoPostal = 0){
        this.modificarCalle(calle);
        this.modificarNumero(numero);
        this.modificarCodigoPostal(codigoPostal);
        console.log("Construido nuevo edificio en calle: "+ this.calle + ", nº:" + this.numero +", CP:"+ this.codigoPostal+".");
    }

    agregarPlantasYPuertas(numplantas, puertas){
        if(numplantas>0 && puertas > 0){
            for(let i = 0 ; i < numplantas ;i++){
                this.plantasEdificio.push([]);
                for(let ii = 0; ii < puertas ;ii++){
                    this.plantasEdificio[( this.plantasEdificio.length - 1)].push("");
                }
            }
            return true;
        }
        console.log("Error,solo se permiten numeros mayores a 0");
        return false;
        
    } // Se le pasa el número de plantas que queremos crear en el piso y el número de puertas por planta. Cada vez que se llame a este método, añadirá el número de plantas y puertas indicadas en los parámetros, a las que ya están creadas en el edificio.
    modificarNumero(numero){
        if(typeof(numero) === "number" && numero > 0){
            this.numero = numero;
        }
    } // Se le pasa el nuevo número del edificio para que lo actualice.
    modificarCalle(calle){
        if(calle){
            this.calle = calle;
        }
    } // Se le pasa el nuevo nombre de la calle para que lo actualice.
    modificarCodigoPostal(codigoPostal){
        if(codigoPostal > 0 && typeof(codigoPostal) === "number"){
            this.codigoPostal = codigoPostal;
        }
    } // Se le pasa el nuevo número de código postal del edificio.
    imprimeCalle(){
        return this.calle;
    } // Devuelve el nombre de la calle del edificio.
    imprimeNumero(){
        return this.numero;
    } // Devuelve el número del edificio.
    imprimeCodigoPostal(){
        return this.codigoPostal;
    } // Devuelve el código postal del edificio.
    agregarPropietario(nombre,planta,puerta){
        if(!nombre || planta <= 0 || puerta <= 0 || planta > this.plantasEdificio.length){
            return false;
        }
        if(puerta > this.plantasEdificio[planta-1].length){
            return false;
        }

        this.plantasEdificio[planta-1][puerta-1] = nombre;
        console.log(this.plantasEdificio[planta-1][puerta-1] + " es ahora el propietario de la puerta " + (puerta) + " de la planta " + (planta) +".");
    } // Se le pasa un nombre de propietario, un número de planta y un número de puerta y lo asignará como propietario de ese piso.

    imprimePlantas(){
        if(this.plantasEdificio.length > 0){
            for(let i = 0 ; i < this.plantasEdificio.length ;i++){
                for(let ii = 0; ii < this.plantasEdificio[i].length ;ii++){
                    console.log("a");
                    //console.log("Propietario del piso" + (++ii) +"de la planta "+(++i)+": "+ this.plantasEdificio+".");
                }
            }
        }
    } // Recorrerá el edificio e imprimirá todos los propietarios de cada puerta.
}

let edificioA = new Edificio("Garcia Prieto",58,15706);
let edificioB = new Edificio("Camino Caneiro",29,32004);
let edificioC = new Edificio("San Clemente",'',15705);
edificioA.agregarPlantasYPuertas(2,3);
edificioA.agregarPropietario("Jose Antonio Lopez", 1,1);
edificioA.agregarPropietario("Luisa Martinez", 1,2);
edificioA.agregarPropietario("Marta Castellón", 1,3);
edificioA.agregarPropietario("Antonio Perea", 2,2);
console.log(edificioA);
//console.log(edificioA[0]);
//edificioA.imprimePlantas();