window.addEventListener('load', inicio) //cargo todos los elementos
let syscall = new Sistema ();

function inicio(){
    const btnDatos = document.getElementById('botondatos');
    const btnEstadisticas = document.getElementById('botonestadisticas');
    btnDatos.addEventListener('click', cambiodatos); //boton datos
    btnEstadisticas.addEventListener('click', cambioestadisticas); //boton estadisticas
    
    
    document.getElementById('agregarcarrera').addEventListener('click', registrocarrera); //boton registrar carrera
    document.getElementById('agregarsponsor').addEventListener('click', registroSponsor); //boton registrar sponsor
    document.getElementById('agregarcorredor').addEventListener('click', registroCorredor); //boton registrar corredor
    document.getElementById('botonregistro').addEventListener('click', registroInscripcion); //boton registrar inscripcion

    // Inicializar el estado visual
    btnDatos.classList.add('activo');
    btnEstadisticas.classList.remove('activo');
}

//BOTONES

function cambiodatos(){ //funcion para mostrar datos

    document.getElementById('datos').style.display = "block";
    document.getElementById('estadisticas').style.display = "none";
    document.getElementById('botondatos').classList.add('activo');
    document.getElementById('botonestadisticas').classList.remove('activo');
}

function cambioestadisticas(){ //funcion para mostrar estadisticas

    document.getElementById('datos').style.display = "none";
    document.getElementById('estadisticas').style.display = "block";
    document.getElementById('botondatos').classList.remove('activo');
    document.getElementById('botonestadisticas').classList.add('activo');

    document.getElementById('idPromedio').innerHTML = syscall.calcularPromedioInscriptos();
    document.getElementById('idPorcentajeElite').innerHTML = calcularElites();
    listarCarreraMasInscriptos();
    listarCarrerasSinInscriptos();
}

//FIN DE BOTONES

//REGISTROS

 function registrocarrera(){ //funcion registro carreras

    let carrera = new Carrera(); 
    
    let formulario = document.getElementById('registrocarrera');

    if (formulario.reportValidity()){
    carrera.nombre = document.getElementById('nomcarrera').value;
    carrera.departamento = document.getElementById('departamentocarrera').value;
    carrera.fecha = document.getElementById('fechacarrera').value;
    carrera.cupos = document.getElementById('cuposcarrera').value;
    carrera.cont = 0;
   
        if(!syscall.checkearCarreraRepetida(carrera)){
              syscall.pushearCarrera(carrera);
               
                    carrera.actualizarListaSponsor(); 
                        carrera.actualizarListaInscripciones();
                            formulario.reset();
         }else{
        alert('La carrera ya ha sido ingresada.');
    }
}
        }

function registroSponsor(){

let sponsor = new Sponsor(); 
formulario = document.getElementById('registrosponsor');

if(formulario.reportValidity()){

    sponsor.nombre = document.getElementById('nombresponsor').value;

    sponsor.rubro = document.getElementById('rubrosponsor').value;

    sponsor.carrera = document.getElementById('idcarrera').value;
        
        if(syscall.checkearSponsorRepetido(sponsor) && syscall.listasponsors.length > 0 ){

            sponsor = syscall.buscaSponsor(sponsor);

            sponsor.rubro = document.getElementById('rubrosponsor').value;
           
            sponsor.carrera = document.getElementById('idcarrera').value;
           
            alert('El sponsor fue actualizado correctamente');
            console.log(syscall.listasponsors);
            
        }else{
                    syscall.pushearSponsors(sponsor);
                }      
                formulario.reset();
            }
}

function leerRadioCorredor(){
    let radios = document.getElementsByName('typecorredor');
    let resultado;
    let aux = false;
    for (let i = 0; i <radios.length && !aux; i++){
        if (radios[i].checked){
            resultado = radios[i].value;
            aux = true;
        }
    }
    return resultado;
}

function registroCorredor(){

    let corredor = new Corredor();
    let formulario = document.getElementById('registrocorredores');

    if (formulario.reportValidity()){
    corredor.nombre= document.getElementById('nombrecorredor').value;
    corredor.edad=document.getElementById('edadcorredor').value;
    corredor.cedula=document.getElementById('idcorredor').value;
    corredor.fichamedica=document.getElementById('fechamedica').value;
    corredor.tipocorredor = leerRadioCorredor();

    
        if (!syscall.checkearCorredorRepetido(corredor)){
            
            syscall.pushearCorredores(corredor);
            corredor.actualizarListaCorredoresInscripciones();
            formulario.reset();
        }else{
            alert('El corredor ya fue ingresado');
        }
}

  
}

function registroInscripcion() {
   
    let inscripcion = new Inscripcion();
    let formulario = document.getElementById('inscripcioncarrera');
  
       if (formulario.reportValidity()) {
        
        let carrera = document.getElementById('selectorcarrera').value;  
        inscripcion.carrera = syscall.buscaCarrera(carrera);
        let corredor = document.getElementById('selectorcorredor').value;
        inscripcion.corredor = syscall.buscaCorredor(corredor);
               

    if (syscall.corredorYaInscripto(inscripcion)) {
        alert('El corredor ya está inscripto en esa carrera.');

    }else{
        if(!syscall.validoSponsors(inscripcion.carrera.nombre)){
            alert('No se puede inscribir en una carrera sin Sponsor');
        }else{
        if (!syscall.validarCupos(carrera)) {
            
            inscripcion.cupo = syscall.generarCupo(carrera); 
            syscall.actualizarCupos(carrera);        
            
       
            syscall.pushearInscripciones(inscripcion);

            let sponsor = syscall.buscaSponsorCarrera(inscripcion.carrera.nombre);
            let mensaje = [inscripcion.toString(inscripcion),     
                            `\nDatos del Sponsor:\n${sponsor.toString()}`
                           ].join('\n');
            alert(mensaje);
            descargarInscripcionPDF(inscripcion);
            formulario.reset();

        }else{
            if(!inscripcion.inscripcionFechaValida()){
            alert('La ficha médica no está vigente para la fecha de la carrera.');
            
            }
    
        }
    }

}
}
}


//FIN REGISTROS


//FUNCION GENERAR PDF

function descargarInscripcionPDF(inscripcion) {
    const doc = new window.jspdf.jsPDF();
    doc.text("Datos de la Inscripción", 10, 10);
    doc.text(`Corredor: ${inscripcion.corredor.nombre} (Cédula: ${inscripcion.corredor.cedula})`, 10, 20);
    doc.text(`Carrera: ${inscripcion.carrera.nombre}`, 10, 30);
    doc.text(`Departamento: ${inscripcion.carrera.departamento}`, 10, 40);
    doc.text(`Fecha de la carrera: ${inscripcion.carrera.fecha}`, 10, 50);
    doc.text(`Cupo: ${inscripcion.cupo}`, 10, 60);
    doc.save("inscripcion" + inscripcion.corredor.nombre + ".pdf");
}



//ESTADISTICAS



function listarCarreraMasInscriptos(){
    
    let lista = document.getElementById('idCarreraMasInscriptos');
    let info = syscall.calcularCarreraConMasInscriptos();
    
    lista.innerHTML = '';
    
    for (elem of info){
    
    let nodo = document.createElement('li');
    let nodoT = document.createTextNode(elem);

    nodo.appendChild(nodoT);
    lista.appendChild(nodo);
}
  
}

function listarCarrerasSinInscriptos() {
         let lista = document.getElementById('idCarreraSininscriptos');
        
         for (let i = 0; i < syscall.listacarreras.length; i++) {
      
            if (syscall.listacarreras[i].cont == 0){

                let nombre=syscall.listacarreras[i].nombre;

                let nodo = document.createElement('li');
                let nodoT = document.createTextNode(nombre);

                nodo.appendChild(nodoT);
                lista.appendChild(nodo);
       
       
    }
}

}

function calcularElites(){
    let elites =0;
    
    for (elem of syscall.listacorredores){

        if (elem.tipocorredor == 'elite'){
            elites++;
        }
    }

    let resultado = elites / syscall.listacorredores.length *100;

    return resultado;
}









