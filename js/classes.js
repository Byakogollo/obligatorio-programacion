class Carrera {
    constructor(nombre, departamento, fecha, cupos) {

        this.nombre = nombre;
        this.departamento = departamento;
        this.fecha = fecha;
        this.cupos = cupos;
    }

 
     actualizarListaSponsor(){

    let lista = document.getElementById('idcarrera');

    let nodo = document.createElement('option');
    let nodoT = document.createTextNode(this.nombre);

    nodo.appendChild(nodoT)
    lista.appendChild(nodo);

}   

toString(){
    let datos = this.nombre+this.departamento+this.fecha+this.cupos;

    return datos;
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
    let nodoT = document.createTextNode('Nombre: '+this.nombre+' Cedula: '+this.cedula);

    nodo.appendChild(nodoT)
    lista.appendChild(nodo);

}   




}

class Inscripcion {
    constructor(corredor, carrera) {

        this.corredor = corredor;
        this.carrera = carrera;
    }




    
}

class Sistema {
    constructor() {
        this.listacarreras = [];
        this.listacorredores = [];
        this.listasponsors = [];
        this.listainscripciones = [];
    }






  pushearCarrera(carrera){

    this.listacarreras.push(carrera);
    console.log(this.listacarreras);
  }

  pushearCorredores(corredor){
      
        this.listacorredores.push(corredor);
        console.log(this.listacorredores);
    
  }

  pushearSponsors(sponsor) {

        this.listasponsors.push(sponsor);
        console.log(this.listasponsors);
    }

  pushearInscripciones(inscripcion){

    this.listainscripciones.push(inscripcion);
    console.log(this.inscripciones);

  }

  checkearCarreraRepetida(carrera){
     let aux = false;

    for (let i = 0; i < this.listacarreras.length && aux==false; i++){
       
        if (this.listacarreras[i].nombre == carrera.nombre){
            aux = true;
        }
    }

    return aux;

}

checkearSponsorRepetido(sponsor){
     let aux = false;

    for (let i = 0; i < this.listasponsors.length && aux==false; i++){
       
        if (this.listasponsors[i].nombre == sponsor.nombre){
            aux = true;
        }
    }

    return aux;

}

buscaSponsor(sponsor){
        let aux = false;
        let pos = 0;
   
        for (let i = 0; i < this.listasponsors.length && aux==false; i++){
       
        if (this.listasponsors[i].nombre == sponsor.nombre){
            aux = true;
            pos = this.listasponsors[i];
        }
    }

    return pos;
}

checkearCorredorRepetido(corredor){
     let aux = false;

    for (let i = 0; i < this.listacorredores.length && aux==false; i++){
       
        if (this.listacorredores[i].cedula == corredor.cedula){
            aux = true;
        }
    }

    return aux;

}
  






}