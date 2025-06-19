window.addEventListener('load', inicio) //cargo todos los elementos
let syscall = new Sistema ();

function inicio(){
    document.getElementById('botondatos').addEventListener('click', cambiodatos); //boton datos
    document.getElementById('botonestadisticas').addEventListener('click', cambioestadisticas); //boton estadisticas
    
    
    document.getElementById('agregarcarrera').addEventListener('click', registrocarrera); //boton registrar carrera
    document.getElementById('agregarsponsor').addEventListener('click', registroSponsor); //boton registrar sponsor
    document.getElementById('agregarcorredor').addEventListener('click', registroCorredor); //boton registrar corredor
    document.getElementById('botonregistro').addEventListener('click', registroInscripcion); //boton registrar inscripcion

}

//BOTONES

function cambiodatos(){ //funcion para mostrar datos

    document.getElementById('datos').style.display = "block";
    document.getElementById('estadisticas').style.display = "none";
}

function cambioestadisticas(){ //funcion para mostrar estadisticas

    document.getElementById('datos').style.display = "none";
    document.getElementById('estadisticas').style.display = "block";
    mostrarPromedioInscriptos();
}

//FIN DE BOTONES

//REGISTROS

 function registrocarrera(){ //funcion registro carreras

    let carrera = new Carrera(); 
    

    carrera.nombre = document.getElementById('nomcarrera').value;
    carrera.departamento = document.getElementById('departamentocarrera').value;
    carrera.fecha = document.getElementById('fechacarrera').value;
    carrera.cupos = document.getElementById('cuposcarrera').value;
    
    syscall.pushearCarrera(carrera);
    carrera.actualizarListaSponsor(); 
    carrera.actualizarListaInscripciones();
    document.getElementById('registrocarrera').reset();
}

function registroSponsor(){

let sponsor = new Sponsor(); 

sponsor.nombre = document.getElementById('nombresponsor').value;
sponsor.rubro = document.getElementById('rubrosponsor').value;
sponsor.carrera = document.getElementById('idcarrera').value;
        
syscall.pushearSponsors(sponsor);
        
}

function registroCorredor(){

    let corredor = new Corredor();

    corredor.nombre= document.getElementById('nombrecorredor').value;
    corredor.edad=document.getElementById('edadcorredor').value;
    corredor.cedula=document.getElementById('idcorredor').value;
    corredor.fichamedica=document.getElementById('fechamedica').value;
    corredor.tipocorredor=document.getElementsByName('typecorredor').value;

    syscall.pushearCorredores(corredor);
    corredor.actualizarListaCorredoresInscripciones();

  
}

function registroInscripcion(){

    let inscripcion = new Inscripcion();

    inscripcion.corredor = document.getElementById('selectorcorredor').value;
    inscripcion.carrera = document.getElementById('selectorcarrera').value;
    
    syscall.pushearInscripciones(inscripcion);

}

function descargarInscripcionPDF(inscripcion) {
    const doc = new window.jspdf.jsPDF();
    doc.text("Datos de la Inscripción", 10, 10);
    doc.text(`Corredor: ${inscripcion.corredor.nombre} (Cédula: ${inscripcion.corredor.cedula})`, 10, 20);
    doc.text(`Carrera: ${inscripcion.carrera.nombre}`, 10, 30);
    doc.text(`Departamento: ${inscripcion.carrera.departamento}`, 10, 40);
    doc.text(`Fecha de la carrera: ${inscripcion.carrera.fecha}`, 10, 50);
    doc.text(`Cupo: ${inscripcion.carrera.cupos}`, 10, 60);
    // Puedes agregar más datos según lo que necesites
    doc.save("inscripcion.pdf");
}

//FIN REGISTROS

//ESTADISTICAS

function promedioInscripciones () {
    calcularPromedioInscripciones(syscall.inscripciones);
}

function mostrarPromedioInscriptos() {
    // Llama al método del sistema y lo muestra en la interfaz
    let promedio = syscall.calcularPromedioInscriptos();
    // Redondea a 2 decimales
    promedio = promedio.toFixed(2);
    // Busca el elemento donde mostrar el promedio
    let pPromedio = document.querySelector('#estadisticas p');
    if (pPromedio) {
        pPromedio.textContent = 'Promedio de inscriptos por carrera: ' + promedio;
    }
}




















