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

    if (hoy > fechaingresada){

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


     actualizarListaSponsor(){
    
    let lista = document.getElementById('idcarrera');
        lista.innerHTML = '';
   
        for (let elem of syscall.listacarreras){
    
      
    let nodo = document.createElement('option');
    let nodoT = document.createTextNode(elem.nombre);

    nodo.appendChild(nodoT)
    lista.appendChild(nodo);
}
        
    



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
        lista.innerHTML = '';
    
        for (let elem of syscall.listacarreras){
    
            let nodo = document.createElement('option');
    
            nodo.value = elem.nombre; 
    
            nodo.textContent = elem.nombre;
    
            lista.appendChild(nodo);
    }

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
        
        if (syscall.existeSponsor(objeto)){
             datos = 'Nombre: ' + this.nombre + 
                    '\nRubro: ' + this.rubro + 
                    '\nCarrera: ' + this.carrera;
            }else{
                datos = 'Esta carrera no tiene sponsor';
            }


    return datos;
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
        this.cupo = cupo;
    }

  
        toString(inscripcion){
        let mensaje = `Inscripción confirmada:

 Cupo numero: ${inscripcion.cupo}

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
Cupos restantes: ${inscripcion.cupo}`;
                

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

    existeSponsor(){
        let aux = false;

        if (this.listasponsors.length == 0){
            aux = true;}
        
        return aux;
    }

    buscaSponsorCarrera(carrera){

        let aux = false;
        let pos = 0;
        for (let i = 0; i < this.listasponsors.length && aux == false; i++) {
            if (this.listasponsors[i].carrera == carrera) {
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

        let cont = parseInt(syscall.buscaCarrera(carrera).cupos);

               
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
      
        if (this.listacarreras.length == 0 || !this.validarInscriptos()) {

            let mensaje = 'No hay datos disponibles actualmente';
         
            masInscriptos.push(mensaje);
        
        }else{

        let inscriptosant = 0;
        let inscriptos;

        for (let i = 0; i < this.listacarreras.length; i++) {
      
            inscriptos = this.listacarreras[i].cont;
           
             if (inscriptos > inscriptosant) {

                inscriptosant = inscriptos;

                masInscriptos = [];
                masInscriptos.push(this.listacarreras[i].nombre);

            } else if (inscriptos == inscriptosant) {
                masInscriptos.push(this.listacarreras[i].nombre);
            }
        }
        }
        return masInscriptos;
    }

    //FIN ESTADISTICAS



}