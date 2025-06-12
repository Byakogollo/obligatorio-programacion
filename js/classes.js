class Carrera {
    constructor(nombre, departamento, fecha, cupos) {

        this.nombre = nombre;
        this.departamento = departamento;
        this.fecha = fecha;
        this.cupos = cupos;
       
    }
  
    agregarCarrera(carrera){
        this.listacarreras.push(carrera);
        console.log(carrera.listacarreras);
    }

     actualizarListaSponsor(){

    let lista = document.getElementById('idcarrera');

    let nodo = document.createElement('option');
    let nodoT = document.createTextNode(this.nombre);

    nodo.appendChild(nodoT)
    lista.appendChild(nodo);

}   

 actualizarListaInscripciones(){

    let lista = document.getElementById('selectorcarrera');

    let nodo = document.createElement('option');
    let nodoT = document.createTextNode(this.nombre);

    nodo.appendChild(nodoT)
    lista.appendChild(nodo);

}   

  
}

class Sponsor {
    constructor(nombre, rubro, carrera) {

        this.nombre = nombre;
        this.rubro = rubro;
        this.carrera = carrera;
       
    }              

   agregarSponsor(sponsor){
        this.listasponsors.push(sponsor);
        console.log(sponsor.listasponsors);
    }

    SponsorRepetido(sponsor){
        let repetido = false;
        for (let i = 0; i < this.listasponsors.length && !repetido; i++){
            if(this.listasponsors[i].nombre == sponsor.nombre){
                repetido = true
            } 
        } return repetido

    } 
    ActualizarSponsor(rubro, carrera){
        this.sponsor.rubro = rubro;
        this.sponsor.carrera = carrera;
    }

}

class Corredor {
    constructor(nombre, edad, cedula, fichamedica, tipocorredor) {

        this.nombre = nombre;
        this.edad = edad;
        this.cedula = cedula;
        this.fichamedica = fichamedica;
        this.tipocorredor = tipocorredor;
       
    }

     agregarCorredor(corredor){
        this.listacorredores.push(corredor);
        console.log(corredor.listacorredores);
    }


     actualizarListaCorredoresInscripciones(){

    let lista = document.getElementById('selectorcorredor');

    let nodo = document.createElement('option');
    let nodoT = document.createTextNode(this.nombre);

    nodo.appendChild(nodoT)
    lista.appendChild(nodo);

}   

    calcularEdad(fechaNacimiento) {
    let partes = fechaNacimiento.split("/");

    let diaNacimiento = parseInt(partes[0]);
    let mesNacimiento = parseInt(partes[1]);
    let anioNacimiento = parseInt(partes[2]);

    let hoy = new Date();
    let diaHoy = hoy.getDate();
    let mesHoy = hoy.getMonth() + 1; // los meses van de 0 a 11
    let anioHoy = hoy.getFullYear();

    let edad = anioHoy - anioNacimiento;

    if (mesHoy < mesNacimiento) {
        edad = edad - 1;
    } else {
        if (mesHoy === mesNacimiento) {
            if (diaHoy < diaNacimiento) {
                edad = edad - 1;
            }
        }
    }

    return edad + " años";

    }


}

class Inscripcion {
    constructor(corredor, carrera, fechaInscripcion) {

        this.corredor = corredor;
        this.carrera = carrera;
        this.fechaInscripcion = fechaInscripcion;
}
    inscripcionFechaValida() {
        let esValida = false;

        if (this.fechaInscripcion < this.corredor.fichamedica) {
            esValida = true;
        }

        return esValida;
}


consultaDeInscriptos(carrera){ //metodo para cantidad de corredores por carrera, estadisticas en proceso falta tabla
        let cantDeCorredores = 0
        let corredoresPorCarrera = []
        for (let i = 0; i < listacorredores.length; i++) {
            if(this.Inscripcion.carrera[i] == carrera){
                cantDeCorredores = cantDeCorredores + 1;
                corredoresPorCarrera.push(this.inscripcion.nombre[i])
            }
        }
    }


}

class Sistema {
    constructor() {
        this.listaCarreras = [];
        this.listaCorredores = [];
        this.listaSponsors = [];
        this.listaInscripciones = [];
    }


  

    
}