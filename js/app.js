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
    mostrarPromedioInscriptos();
    mostrarCarreraConMasInscriptos();
    // Aquí puedes llamar a otras funciones para mostrar estadísticas adicionales
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


function registroCorredor(){

    let corredor = new Corredor();
    let formulario = document.getElementById('registrocorredores');

    if (formulario.reportValidity()){
    corredor.nombre= document.getElementById('nombrecorredor').value;
    corredor.edad=document.getElementById('edadcorredor').value;
    corredor.cedula=document.getElementById('idcorredor').value;
    corredor.fichamedica=document.getElementById('fechamedica').value;
    corredor.tipocorredor=document.getElementsByName('typecorredor').value;

    
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
    let cedulaCorredor = document.getElementById('selectorcorredor').value;
    let nombreCarrera = document.getElementById('selectorcarrera').value;

    let corredor = syscall.listacorredores.find(c => c.cedula == cedulaCorredor);
    let carrera = syscall.listacarreras.find(c => c.nombre == nombreCarrera);

    if (!corredor || !carrera) {
        alert('Debes seleccionar un corredor y una carrera válidos.');
        return;
    }

    // Validar que no esté ya inscripto usando el método de Sistema
    if (syscall.corredorYaInscripto(corredor, carrera)) {
        alert('El corredor ya está inscripto en esa carrera.');
        return;
    }

    // Validar ficha médica
    let inscripcion = new Inscripcion(corredor, carrera);
    if (!inscripcion.inscripcionFechaValida()) {
        alert('La ficha médica no está vigente para la fecha de la carrera.');
        return;
    }

    // Validar cupo
    let inscriptosEnCarrera = syscall.listainscripciones.filter(insc => insc.carrera.nombre == carrera.nombre).length;
    if (inscriptosEnCarrera >= carrera.cupos) {
        alert('No hay cupos disponibles en la carrera.');
        return;
    }

    syscall.pushearInscripciones(inscripcion);
    // Aquí puedes agregar el reset del formulario o cualquier otra acción
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

function mostrarCarreraConMasInscriptos() {
    // Llama al método del sistema y lo muestra en la interfaz
    let carrera = syscall.carreraConMasInscriptos();
    // Busca el elemento donde mostrar la carrera
    let pCarreraa = document.querySelector('#estadisticas p')[1];
    if (pCarreraa) {
        pCarreraa.textContent = 'Carrera con más inscriptos: ' + carrera.nombre + ' con ' + carrera.cupos + "y " + carrera.inscripciones.length + ' inscriptos';
    }
}

//MAPA
// aquí va la lógica de mapa si la necesitas
//FIN MAPA
















