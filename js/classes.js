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




}

class Corredor {
    constructor(nombre, edad, cedula, fichamedica, tipocorredor) {

        this.nombre = nombre;
        this.edad = edad;
        this.cedula = cedula;
        this.fichamedica = fichamedica;
        this.tipocorredor = tipocorredor;
       
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
    constructor(corredor, carrera) {

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





}

class Sistema {
    constructor() {
        this.listaCarreras = [];
        this.listaCorredores = [];
        this.listaSponsors = [];
        this.listaInscripciones = [];
    }


  pushearCarrera(carrera){
    this.carreras.push(carrera);
    console.log(this.carreras);
  }

  pushearCorredores(corredor){
      
        this.corredores.push(corredor);
        console.log(this.corredores);
    
  }

  pushearSponsors(sponsor) {

        this.sponsors.push(sponsor);
        console.log(this.sponsors);
    

  }

  pushearInscripciones(inscripcion){

    this.inscripciones.push(inscripcion);
    console.log(this.inscripciones);

  }

  
  






}