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




