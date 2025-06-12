class Carrera {
    constructor(nombre, departamento, fecha, cupos) {

        this.nombre = nombre;
        this.departamento = departamento;
        this.fecha = fecha;
        this.cupos = cupos;
        this.listacarreras = [];
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
        this.listasponsors = [];
    }              

   agregarSponsor(sponsor){
        this.listasponsors.push(sponsor);
        console.log(sponsor.listasponsors);
    }

    SponsorRepetido(sponsor){
        let repetido = false;
        for (let i = 0; i < this.listasponsors.length && !repetido; i++){
            if(this.listasponsors[i].nombre === sponsor.nombre){
                repetido = true
            } 
        } return repetido

    }
}

class Corredor {
    constructor(nombre, edad, cedula, fichamedica, tipocorredor) {

        this.nombre = nombre;
        this.edad = edad;
        this.cedula = cedula;
        this.fichamedica = fichamedica;
        this.tipocorredor = tipocorredor;
        this.listacorredores=[];
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




}

class Inscripcion {
    constructor(corredor, carrera, fechaInscripcion) {

        this.corredor = corredor + " con cedula: " + corredor.cedula;
        this.carrera = carrera;
        this.fechaInscripcion = fechaInscripcion;
    }


    
}

class Sistema {
    constructor() {
        this.carreras = [];
        this.corredores = [];
        this.sponsors = [];
        this.inscripciones = [];
    }


  

    
}