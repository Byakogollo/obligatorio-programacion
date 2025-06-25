class Carrera {
    constructor(nombre, departamento, fecha, cupos, cont) {

        this.nombre = nombre;
        this.departamento = departamento;
        this.fecha = fecha;
        this.cupos = cupos;
        this.cont = cont;
    }

    fechaValida(fecha){
    
    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
        
    let fechaingresada = new Date(fecha);
    fechaingresada.setHours(0, 0, 0, 0);

    let aux = false;

    if (hoy < fechaingresada){

        aux = true;
        
    }
    return aux;
    
    }
    
    valorDepto(){
       
    let lista = document.getElementById('departamentocarrera');
    let resultado;
    let aux = false;

    for (let i = 0; i <lista.length && !aux; i++){
        if(lista.options[i].selected){
            resultado = lista.options[i].textContent;
            aux = true;
        }
    }
    return resultado;

    }


     actualizarCombosCarreras(){
    
    let listaCarrerasSponsor = document.getElementById('idcarrera');
    let listaCarrerasInscripciones = document.getElementById('selectorcarrera');
    let listaCarrerasEstadisticas = document.getElementById('seleccioncarrera');

    listaCarrerasInscripciones.innerHTML = '';
    listaCarrerasSponsor.innerHTML = '';
    listaCarrerasEstadisticas.innerHTML = '';
   
        for (let elem of syscall.listacarreras){
    
      
    let nodoSponsors = document.createElement('option');
    let nodoTsponsors = document.createTextNode(elem.nombre);
    nodoSponsors.appendChild(nodoTsponsors);

    let nodoInscripciones = document.createElement('option');
    let nodoTinscripciones = document.createTextNode(elem.nombre);
    nodoInscripciones.appendChild(nodoTinscripciones);

    let nodoEstadisticas = document.createElement('option');
    let nodoTestadisticas = document.createTextNode(elem.nombre);
    nodoEstadisticas.appendChild(nodoTestadisticas);

    listaCarrerasSponsor.appendChild(nodoSponsors);
    listaCarrerasInscripciones.appendChild(nodoInscripciones);
    listaCarrerasEstadisticas.appendChild(nodoEstadisticas);

}
        
    



}   

toString(){
let datos = 'Carrera: ' + this.nombre + 
            '\nDepartamento: ' + this.departamento + 
            '\nFecha: ' + this.fecha + 
            '\nCupos: ' + this.cupos;

    return datos;
}



    
}



class Sponsor {
    constructor(nombre, rubro, carrera) {
        this.nombre = nombre;
        this.rubro = rubro;
        this.carrera = carrera;
    }
 
   

    toString(objeto){

        let datos;
        
        if (!syscall.noExisteSponsor(objeto)){
             datos = 'Nombre: ' + this.nombre + 
                    '\nRubro: ' + this.rubro + 
                    '\nCarrera: ' + this.carrera;
            }else{
                datos = 'Esta carrera no tiene sponsors';
            }


    return datos;
}

  

 

        
    }




}

class Corredor {
    constructor(nombre, edad, cedula, fichamedica, tipocorredor, cupo) {

        this.nombre = nombre;
        this.edad = edad;
        this.cedula = cedula;
        this.fichamedica = fichamedica;
        this.tipocorredor = tipocorredor;
        this.cupo = cupo;
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
        lista.innerHTML = '';
        
        for (let elem of syscall.listacorredores){
            let nodo = document.createElement('option');

            nodo.value = elem.cedula; 
            nodo.textContent = 'Nombre: ' + elem.nombre + ' || Cedula: ' + elem.cedula;
    
        lista.appendChild(nodo);
}

  

}   

}

class Inscripcion {
    constructor(corredor, carrera, cupo) {

        this.corredor = corredor;       
        this.carrera = carrera;
    }

  
        toString(inscripcion){
        let mensaje = `Inscripción confirmada:

 Cupo numero: ${syscall.buscaCarrera(inscripcion.carrera.nombre).cont}

Corredor:
Nombre: ${inscripcion.corredor.nombre}
Edad: ${inscripcion.corredor.edad}
Cédula: ${inscripcion.corredor.cedula}
Vigencia Ficha Medica: ${inscripcion.corredor.fichamedica}
Tipo Corredor: ${inscripcion.corredor.tipocorredor}

Carrera:
Nombre: ${inscripcion.carrera.nombre}
Departamento: ${inscripcion.carrera.departamento}
Fecha: ${inscripcion.carrera.fecha}
Cupos Disponibles: ${syscall.buscaCarrera(inscripcion.carrera.nombre).cupos}`;
                

                return mensaje;
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

 // PUSHEO ITEMS

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

//FIN PUSHEAR ITEMS



//INICIO ORDENACION

ordenarCarrerasNombre(){
    
    this.listacarreras.sort((a, b) => {
    return a.nombre.localeCompare(b.nombre);
});

}

ordenarCarrerasFecha(){
    
    this.listacarreras.sort((a, b) => {
    return new Date(a.fecha)- new Date(b.fecha);
});

}

ordenarCorredoresNombre(){
    
    this.listacorredores.sort((a, b) => {
    return a.nombre.localeCompare(b.nombre);
});

}

//FIN ORDENACION
   
   
//LOGICA CARRERAS

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
     

    checkearCarreraRepetida(carrera) {
        let aux = false;
        for (let i = 0; i < this.listacarreras.length && aux == false; i++) {
            if (this.listacarreras[i].nombre == carrera.nombre) {
                aux = true;
            }
        }
        return aux;
    }

//FIN LOGICA CARRERAS



//INICIO LOGICA SPONSORS

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

    validoSponsors(carrera){
        
        let aux = false;
        

        for (let i = 0; i < this.listasponsors.length && aux == false; i++) {
            if (this.listasponsors[i].carrera == carrera) {
                aux = true;
                
            }
        }
        return aux;
    }

    noExisteSponsor(){
        let aux = false;

        if (this.listasponsors.length == 0){
            aux = true;
        }
        
        return aux;
    }

    buscaSponsorCarrera(carrera){

        let aux = false;
        let pos = 0;
     
        for (let i = 0; i < this.listasponsors.length && aux == false; i++) {
            
            for (let j = 0; j<this.listasponsors[i].carrera.length; j++)
              
                if (this.listasponsors[i].carrera[j] == carrera) {
                    aux = true;
                     pos = this.listasponsors[i];
            }
        }
        return pos;
    }

  //FIN LOGICA SPONSORS 
  


  //INICIO LOGICA CORREDORES

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
//FIN LOGICA CORREDORES



//INICIO LOGICA INSCRIPCIONES

    generarCupo(carrera){
        
        this.buscaCarrera(carrera).cont ++;

        let cont = parseInt(syscall.buscaCarrera(carrera).cont);

               
        return cont;
    }

    validarCupos(carrera){
        let aux = false;
        let current = parseInt(syscall.buscaCarrera(carrera).cont);

            if (current >= syscall.buscaCarrera(carrera).cupos){
                alert('No hay mas cupos');
                   aux = true;
            }

            return aux;
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

    buscaInscriptosACarreras(carrera){
        
        let inscriptos = [];
        let corredorInscripto;
        let carreraInscripta;

        for (let elem of this.listainscripciones) {

                corredorInscripto = elem.corredor;
                carreraInscripta = elem.carrera;

                if (carreraInscripta.nombre == carrera) {
                
                inscriptos.push(corredorInscripto);
            }
            
        }
        return inscriptos;
    }
    
    buscaCupoInscripciones(NombreCorredor){
        let cupo = 0;
        let corredor;

        for (let elem of this.listainscripciones){
                 corredor = elem.corredor;

            if (NombreCorredor == corredor.nombre){

                cupo = elem.cupo;
                }
        }

        return cupo;
    }


//FIN LOGICA INSCRIPCIONES 
    

//INICIO ESTADISTICAS

    calcularPromedioInscriptos() {
        let promedio;
      
        if (this.listacarreras.length === 0) {
          promedio = 'No hay datos disponibles actualmente';
        }else{

            let totalinscripciones = 0;
            
            for (let i=0; i < this.listacarreras.length; i++){

                totalinscripciones += this.listacarreras[i].cont;

            }


            promedio = parseFloat(totalinscripciones / this.listacarreras.length).toFixed(2);
         
        }

        return promedio;
    }

    validarInscriptos(){
        let aux = false;

        for (let i = 0; i < this.listacarreras.length && aux==false; i++){

            if (this.listacarreras[i].cont > 0)
                aux = true;

        }
        return aux;
    }

    calcularCarreraConMasInscriptos() {
        let masInscriptos = [];
        let inscriptosant = 0;
        let inscriptos;

        for (let i = 0; i < this.listacarreras.length; i++) {
      
            inscriptos = this.listacarreras[i].cont;
           
             if (inscriptos > inscriptosant) {

                inscriptosant = inscriptos;

                masInscriptos = [];
                masInscriptos.push(this.listacarreras[i]);

            } else if (inscriptos == inscriptosant) {
                masInscriptos.push(this.listacarreras[i]);
            }
        }
        
        return masInscriptos;
    }



    //FIN ESTADISTICAS



}