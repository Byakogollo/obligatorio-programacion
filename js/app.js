window.addEventListener('load', inicio) //cargo todos los elementos

function inicio(){
    document.getElementById('botondatos').addEventListener('click', cambiodatos); //boton datos
    document.getElementById('botonestadisticas').addEventListener('click', cambioestadisticas); //boton estadisticas
    document.getElementById('agregarcarrera').addEventListener('click', registrocarrera); //boton registrar carrera
    document.getElementById('agregarsponsor').addEventListener('click', registrosponsor); //boton registrar sponsor
}



function cambiodatos(){ //funcion para mostrar/esconder datos

    let datos = document.getElementById('datos');

    if (datos.style.display == "block"){
        datos.style.display = "none";
        estadisticas.style.display = "block";
    }else{
        datos.style.display = "block";
        estadisticas.style.display = "none";
    }

}

function cambioestadisticas(){ //funcion para mostrar/esconder estadisticas

    let estadisticas = document.getElementById('estadisticas');

    if (estadisticas.style.display == "block"){
        estadisticas.style.display = "none";
        datos.style.display = "block";
    }else{
        estadisticas.style.display = "block";
        datos.style.display = "none";
    }


}

function registrocarrera(){ //funcion registro carreras

    let carrera = document.getElementById('nomcarrera').value;
    let lugar = document.getElementById('depto').value;
    let fechacarrera = document.getElementById('idfecha').value;
    let cupos = document.getElementById('idcupo').value;    

    carreras.push(carrera, lugar, fechacarrera, cupos);
    document.getElementById('registrocarrera').reset();
    cargarsponsorcarrera();
}

function registrosponsor(){ //funcion registro sponsor

    let sponsor = document.getElementById('nombresponsor').value;
    let rubrosponsor = document.getElementById('rubrosponsor').value;
    let carrerasponsor = document.getElementById('idcarrera').value;

    sponsors.push(sponsor, rubrosponsor, carrerasponsor);
    
}



function cargarsponsorcarrera(){ // Funcion para ctualizar la lista de carreras disponibles para los sponsors

    for (i=0; i<carreras.length; i+=4){
        
        let listacarreras = document.getElementById('idcarrera')
        let nodo = document.createElement('option');
        let nodoT = document.createTextNode(carreras[i]);
        
        nodo.appendChild(nodoT);
        listacarreras.appendChild(nodo);

    }   

}



let carreras = [];
let sponsors = [];
let corredores = [];
let inscripcion = [];










