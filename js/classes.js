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

    // Verifica si el sponsor ya existe en la lista de sponsors del sistema
    static sponsorRepetido(sponsor, sponsorsList) {
        return sponsorsList.some(s => s.nombre === sponsor.nombre);
    }

    // Actualiza los datos del sponsor actual
    actualizarSponsor(rubro, carrera) {
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
    let nodoT = document.createTextNode(this.nombre);

    nodo.appendChild(nodoT)
    lista.appendChild(nodo);

}   




}

class Inscripcion {
    constructor(corredor, carrera) {

        this.corredor = corredor;
        this.carrera = carrera;
    }

inscripcionFechaValida() {
    let esValida = false;

    if (this.carrera.fecha <= this.corredor.fichamedica) {
        esValida = true;

    }
        return esValida;
}


    
}

class Sistema {
    constructor() {
        this.carreras = [];
        this.corredores = [];
        this.sponsors = [];
        this.inscripciones = [];
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

    calcularPromedioInscriptos() {
        if (this.carreras.length === 0) {
            return 0;
        }
        let totalInscriptos = this.inscripciones.length;
        let totalCarreras = this.carreras.length;
        return totalInscriptos / totalCarreras;
    }
}