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

function registroInscripcion(){

    let inscripcion = new Inscripcion();

    inscripcion.corredor = document.getElementById('selectorcorredor').value;
    inscripcion.carrera = document.getElementById('selectorcarrera').value;
    
    syscall.pushearInscripciones(inscripcion);

}

//FIN REGISTROS

//MAPA


   

//FIN MAPA
















