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
let datos = 'Carrera: ' + this.nombre + 
            '\nDepartamento: ' + this.departamento + 
            '\nFecha: ' + this.fecha + 
            '\nCupos: ' + this.cupos;

    return datos;
}



 actualizarListaInscripciones(){

    let lista = document.getElementById('selectorcarrera');

    let nodo = document.createElement('option');
    nodo.value = this.nombre; // El value es el nombre
    nodo.textContent = this.nombre;
    lista.appendChild(nodo);

    }
    
}



class Sponsor {
    constructor(nombre, rubro, carrera) {
        this.nombre = nombre;
        this.rubro = rubro;
        this.carrera = carrera;
    }

    toString(){
let datos = 'Nombre: ' + this.nombre + 
            '\nRubro: ' + this.rubro + 
            '\nCarrera: ' + this.carrera;

    return datos;
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

    toString(){
let datos = 'Nombre: ' + this.nombre + 
            '\nEdad: ' + this.departamento + 
            '\nCedula: ' + this.fecha + 
            '\nFecha de Ficha Medica: ' + this.cupos +
            '\nTipo de Corredor: '+this.tipocorredor;

    return datos;
}


     actualizarListaCorredoresInscripciones(){

    let lista = document.getElementById('selectorcorredor');

    let nodo = document.createElement('option');
    nodo.value = this.cedula; // El value es la cédula
    nodo.textContent = 'Nombre: ' + this.nombre + ' Cedula: ' + this.cedula;
    lista.appendChild(nodo);

}   

}

class Inscripcion {
    constructor(corredor, carrera, cupo) {

        this.corredor = corredor;
        this.carrera = carrera;
        this.cupo = cupo;
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
        this.listacarreras = [];
        this.listacorredores = [];
        this.listasponsors = [];
        this.listainscripciones = [];
    }

    pushearCarrera(carrera) {
        this.listacarreras.push(carrera);
        console.log(this.listacarreras);
    }

    pushearCorredores(corredor) {
        this.listacorredores.push(corredor);
        console.log(this.listacorredores);
    }

    pushearSponsors(sponsor) {
        this.listasponsors.push(sponsor);
        console.log(this.listasponsors);
    }

    pushearInscripciones(inscripcion) {
        this.listainscripciones.push(inscripcion);
        console.log(this.listainscripciones);
    }

    checkearCarreraRepetida(carrera) {
        let aux = false;
        for (let i = 0; i < this.listacarreras.length && aux == false; i++) {
            if (this.listacarreras[i].nombre == carrera.nombre) {
                aux = true;
            }
        }
        return aux;
    }

    checkearSponsorRepetido(sponsor) {
        let aux = false;
        for (let i = 0; i < this.listasponsors.length && aux == false; i++) {
            if (this.listasponsors[i].nombre == sponsor.nombre) {
                aux = true;
            }
        }
        return aux;
    }

    buscaSponsor(sponsor) {
        let aux = false;
        let pos = 0;
        for (let i = 0; i < this.listasponsors.length && aux == false; i++) {
            if (this.listasponsors[i].nombre == sponsor.nombre) {
                aux = true;
                pos = this.listasponsors[i];
            }
        }
        return pos;
    }

    buscaCarrera(carrera) {
        let aux = false;
        let pos = 0;
        for (let i = 0; i < this.listacarreras.length && aux == false; i++) {
            if (this.listacarreras[i].nombre == carrera) {
                aux = true;
                pos = this.listacarreras[i];
            }
        }
        return pos;
    }
     
    buscaCorredor(corredor) {
        let aux = false;
        let pos = 0;
        for (let i = 0; i < this.listacorredores.length && aux == false; i++) {
            if (this.listacorredores[i].cedula == corredor) {
                aux = true;
                pos = this.listacorredores[i];
            }
        }
        return pos;
    }
    
    checkearCorredorRepetido(corredor) {
        let aux = false;
        for (let i = 0; i < this.listacorredores.length && aux == false; i++) {
            if (this.listacorredores[i].cedula == corredor.cedula) {
                aux = true;
            }
        }
        return aux;
    }

    generarCupo(carrera){
        
        let cont = syscall.buscaCarrera(carrera).cupos;
               
        return cont;
    }

    validarCupos(carrera){
        let aux = false;

            if (syscall.buscaCarrera(carrera).cupos <= 0){
                alert('No hay mas cupos');
                   aux = true;
            }

            return aux;
    }

    actualizarCupos(carrera){
        
        syscall.buscaCarrera(carrera).cupos -= 1;
    }

    corredorYaInscripto(inscripcion) {
        let aux = false;
        for (let i = 0; i<this.listainscripciones.length && aux == false; i++){

                if (inscripcion.corredor.cedula == this.listainscripciones[i].corredor.cedula && inscripcion.carrera.nombre == this.listainscripciones[i].carrera.nombre){
                    aux = true;
                }
        }

        return aux;
        
    }

    



    calcularPromedioInscriptos() {
        if (this.listacarreras.length === 0) {
            return 0;
        }
        let totalInscriptos = this.listainscripciones.length;
        let totalCarreras = this.listacarreras.length;
        return totalInscriptos / totalCarreras;
    }

    calcularCarreraConMasInscriptos() {
        if (this.listacarreras.length === 0) {
            return null;
        }
        let carreraMax = this.listacarreras[0];
        let maxInscriptos = 0;

        for (let i = 0; i < this.listacarreras.length; i++) {
            let inscriptos = this.listainscripciones.filter(inscripcion => inscripcion.carrera === this.listacarreras[i]).length;
            if (inscriptos > maxInscriptos) {
                maxInscriptos = inscriptos;
                carreraMax = this.listacarreras[i];
            } else if (inscriptos === maxInscriptos) {
                carreraMax.push(this.listacarreras[i]);
            }
        }
        return carreraMax;
    }

    carrerasConNingunoInscripto() { 
        let carrerasSinInscriptos = [];
        for (let i = 0; i < this.listacarreras.length; i++) {
            let inscriptos = this.listainscripciones.filter(inscripcion => inscripcion.carrera === this.listacarreras[i]).length;
            if (inscriptos === 0) {
                carrerasSinInscriptos.push(this.listacarreras[i]);
                sort(carrerasSinInscriptos, (a, b) => a.fecha - b.fecha);
            }
        }
        return carrerasSinInscriptos;
    }

   

}