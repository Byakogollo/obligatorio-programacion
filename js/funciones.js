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

function cambioColor(){

}
function cambiodatos(){ //funcion para mostrar datos

    document.getElementById('datos').style.display = "block";
    document.getElementById('estadisticas').style.display = "none";
}

function cambioestadisticas(){ //funcion para mostrar estadisticas

    document.getElementById('datos').style.display = "none";
    document.getElementById('estadisticas').style.display = "block";

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

if(!sponsor.SponsorRepetido(sponsor.nombre)){
    syscall.pushearSponsors(sponsor);
} else {
    sponsor.ActualizarSponsor(sponsor.rubro, sponsor.carrera);
    alert("nombre de sponsor repetido, actualizando los datos del sponsor...");
}

        
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

//FIN REGISTROS




















