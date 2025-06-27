window.addEventListener('load', inicio) //cargo todos los elementos
let syscall = new Sistema();
let departamentos = ['Canelones','Maldonado','Rocha','Treinta y tres','Cerro Largo','Rivera','Artigas','Salto','Paysandú','Río Negro','Soriano','Colonia','San José','Durazno','Flores','Florida','Lavalleja','Tacuarembó','Montevideo'];
google.charts.load('current', {'packages': ['geochart'],});



function inicio() {
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

function cambiodatos() { 

    document.getElementById('datos').style.display = "block";
    document.getElementById('estadisticas').style.display = "none";
    document.getElementById('botondatos').classList.add('activo');
    document.getElementById('botonestadisticas').classList.remove('activo');
    syscall.ordenarCarrerasNombre();
}

function cambioestadisticas() { 
    document.getElementById('datos').style.display = "none";
    document.getElementById('estadisticas').style.display = "block";
    document.getElementById('botondatos').classList.remove('activo');
    document.getElementById('botonestadisticas').classList.add('activo');

    document.getElementById('idPromedio').innerHTML = syscall.calcularPromedioInscriptos();
    document.getElementById('idPorcentajeElite').innerHTML = calcularElites();


    listarCarreraMasInscriptos();
    syscall.ordenarCarrerasFecha(); 
    listarCarrerasSinInscriptos();

   
    document.getElementById('mapacarrera').checked = true;
    dibujarMapaCarreras();
    document.getElementsByName('radioMapa').forEach((radio) => {
        
        if (radio.value === 'porCarreras') {
            radio.addEventListener('change',dibujarMapaCarreras);
        } else if (radio.value === 'porInscripciones') {
            radio.addEventListener('change',dibujarMapaInscripciones);

        }
    });

    
    document.getElementById('ordenadornombre').checked = true;
    document.getElementById('seleccioncarrera').addEventListener('change', (event) => {
        generarTabla();
    });

    document.getElementsByName('ordenadorCorredor').forEach((radio) => {
        radio.addEventListener('change', generarTabla);
    });
    generarTabla();
}

//FIN DE BOTONES


//INICIO REGISTROS

function registrocarrera() {

    let carrera = new Carrera();

    let formulario = document.getElementById('registrocarrera');

    if (formulario.reportValidity()) {
        carrera.fecha = document.getElementById('fechacarrera').value
        if (carrera.fechaValida(carrera.fecha)) {
            alert('La fecha ingresada no puede ser anterior a la fecha de hoy');
        } else {

            carrera.nombre = document.getElementById('nomcarrera').value;
            carrera.departamento = carrera.valorDepto();
            carrera.fecha = document.getElementById('fechacarrera').value;
            carrera.cupos = document.getElementById('cuposcarrera').value;
            carrera.cont = 0;

            if (!syscall.checkearCarreraRepetida(carrera)) {
                syscall.pushearCarrera(carrera);
                syscall.ordenarCarrerasNombre();

                carrera.actualizarCombosCarreras();
                carrera.resetearAnchoCombos();
                formulario.reset();
            } else {
                alert('La carrera ya ha sido ingresada.');
            }
        }
    }
}

function leerCarrerasSponsor() {

    let selector = document.getElementById('idcarrera');
    let resultado = [];


    for (let i = 0; i < selector.length; i++) {

        resultado.push(selector.selectedOptions[i].value);

    }

    return resultado;
}

function registroSponsor() {

    let sponsor = new Sponsor();
    formulario = document.getElementById('registrosponsor');

    if (formulario.reportValidity()) {

        sponsor.nombre = document.getElementById('nombresponsor').value;

        sponsor.rubro = document.getElementById('rubrosponsor').value;

        sponsor.carrera = leerCarrerasSponsor();

        if (syscall.checkearSponsorRepetido(sponsor) && syscall.listasponsors.length > 0) {

            sponsor = syscall.buscaSponsor(sponsor);

            sponsor.rubro = document.getElementById('rubrosponsor').value;

            sponsor.carrera = document.getElementById('idcarrera').value;

            alert('El sponsor fue actualizado correctamente');
            console.log(syscall.listasponsors);

        } else {
            syscall.pushearSponsors(sponsor);
        }
        formulario.reset();
    }
}

function leerRadioCorredor() {
    let radios = document.getElementsByName('typecorredor');
    let resultado;
    let aux = false;
    for (let i = 0; i < radios.length && !aux; i++) {
        if (radios[i].checked) {
            resultado = radios[i].value;
            aux = true;
        }
    }
    return resultado;
}

function registroCorredor() {

    let corredor = new Corredor();
    let formulario = document.getElementById('registrocorredores');

    if (formulario.reportValidity()) {
        corredor.nombre = document.getElementById('nombrecorredor').value;
        corredor.edad = document.getElementById('edadcorredor').value;
        corredor.cedula = document.getElementById('idcorredor').value;
        corredor.fichamedica = document.getElementById('fechamedica').value;
        corredor.tipocorredor = leerRadioCorredor();


        if (!syscall.checkearCorredorRepetido(corredor)) {

            syscall.pushearCorredores(corredor);
            syscall.ordenarCorredoresNombre();

            corredor.actualizarListaCorredoresInscripciones();
            corredor.resetearAnchoCorredores();
            formulario.reset();
        } else {
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

        } else {
            if (!syscall.validarCupos(carrera)) {

                inscripcion.cupo = syscall.generarCupo(carrera);



                syscall.pushearInscripciones(inscripcion);

                let sponsor = syscall.buscaSponsorCarrera(inscripcion.carrera.nombre);
                let mensaje;

                if (syscall.noExisteSponsor()) {

                    mensaje = [inscripcion.toString(inscripcion),
                        `\nNo hay Sponsors registrados.`
                    ].join('\n');

                } else {

                    mensaje = [inscripcion.toString(inscripcion),
                    `\nDatos del Sponsor:\n${sponsor.toString(inscripcion.carrera.nombre)}`
                    ].join('\n');

                }
                alert(mensaje);
                descargarInscripcionPDF(inscripcion);
                formulario.reset();

            } else {
                if (!inscripcion.inscripcionFechaValida()) {
                    alert('La ficha médica no está vigente para la fecha de la carrera.');

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

//FIN GENERAR PDF


//ESTADISTICAS


function listarCarreraMasInscriptos() {

    let lista = document.getElementById('idCarreraMasInscriptos');
    let info = syscall.calcularCarreraConMasInscriptos();

    lista.innerHTML = '';

    if (syscall.listacarreras.length == 0 || !syscall.validarInscriptos()) {
        let nodo = document.createElement('li');
        let nodoT = document.createTextNode('No hay datos disponibles actualmente');
        nodo.appendChild(nodoT);
        lista.appendChild(nodo);
    } else {
        for (elem of info) {

            let nodo = document.createElement('li');
            let nodoT = document.createTextNode(elem.nombre + ' en ' + elem.departamento + ' el ' + elem.fecha + ' Cupos: ' + elem.cupos + ' Inscriptos: ' + elem.cont);

            nodo.appendChild(nodoT);
            lista.appendChild(nodo);
        }
    }

}

function listarCarrerasSinInscriptos() {

    let lista = document.getElementById('idCarreraSininscriptos');
    lista.innerHTML = '';
    if (syscall.listacarreras.length == 0) {


        let nodo2 = document.createElement('li');
        let nodoT2 = document.createTextNode('No hay elementos para mostrar');

        nodo2.appendChild(nodoT2);
        lista.appendChild(nodo2);

    } else {

        for (let i = 0; i < syscall.listacarreras.length; i++) {

            if (syscall.listacarreras[i].cont == 0) {

                let carreraSinInscriptos = syscall.listacarreras[i];

                let nodo = document.createElement('li');
                let nodoT = document.createTextNode(carreraSinInscriptos.nombre + ' en ' + carreraSinInscriptos.departamento + ' el ' + carreraSinInscriptos.fecha + ' Cupos disponibles: ' + carreraSinInscriptos.cupos);

                nodo.appendChild(nodoT);
                lista.appendChild(nodo);

            }
        }
    }

}

function calcularElites() {
    let elites = 0;
    let resultado;

    if (syscall.listacorredores.length == 0) {

        resultado = 'No hay ningun corredor inscripto.'


    } else {

        for (let elem of syscall.listacorredores) {

            if (elem.tipocorredor == 'elite') {
                elites++;
            }
        }
        resultado = elites / syscall.listacorredores.length * 100 + '%';
    }


    return resultado;
}

//FIN ESTADISTICAS

//INICIO CONSULTA INSCRIPTOS

function leerRadioTabla() {
    let radios = document.getElementsByName('ordenadorCorredor');
    let resultado;
    let aux = false;
    for (let i = 0; i < radios.length && !aux; i++) {
        if (radios[i].checked) {
            resultado = radios[i].value;
            aux = true;
        }
    }

    return resultado;
}

function consultarInscriptos() {

    let carrera = document.getElementById('seleccioncarrera').value;

    let inscriptos = syscall.buscaInscriptosACarreras(carrera);

    if (leerRadioTabla() == 'nombre') {
        inscriptos.sort((a, b) => {
            return a[0].nombre.localeCompare(b[0].nombre);
        });
    } else if (leerRadioTabla() == 'numero') {
        inscriptos.sort((a, b) => {
            return a[1] - b[1];
        })
    }   

    return inscriptos;
}


function generarTabla() {
    if (syscall.listainscripciones.length !== 0) {
        let tbody = tabla.getElementsByTagName("tbody")[0];
        tbody.innerHTML = '';

        let inscriptos = consultarInscriptos();

        for (let [corredor, cupo] of inscriptos) {
            let row = document.createElement('tr');

            let celdaNombre = document.createElement('td');
            celdaNombre.textContent = corredor.nombre;

            let celdaEdad = document.createElement('td');
            celdaEdad.textContent = corredor.edad;

            let celdaCedula = document.createElement('td');
            celdaCedula.textContent = corredor.cedula;

            let celdaFichaMedica = document.createElement('td');
            celdaFichaMedica.textContent = corredor.fichamedica;

            let celdaCupo = document.createElement('td');
            celdaCupo.textContent = cupo;

            row.appendChild(celdaNombre);
            row.appendChild(celdaEdad);
            row.appendChild(celdaCedula);
            row.appendChild(celdaFichaMedica);
            row.appendChild(celdaCupo);

            if (corredor.tipocorredor === 'elite') {
                row.style.backgroundColor = '#FF0000';
            }

            tbody.appendChild(row);
        }
    }
}




//FIN CONSULTA INSCRIPTOS


//INICIO MAPA

function contarCarreras() {
    let cantidadCarreras;

    if (syscall.listacarreras.length != 0) {
        cantidadCarreras = syscall.listacarreras.length;
    } else {
        cantidadCarreras = 99;
    }
    return cantidadCarreras;
}

function contarInscripciones() {
    let cantidadInscripciones;

    if (syscall.listainscripciones.length != 0) {
        cantidadInscripciones = syscall.listainscripciones.length;
    } else {
        cantidadInscripciones = 99;
    }
    return cantidadInscripciones;
}


function dibujarMapaCarreras() {
    let cantidadCarreras = contarCarreras();
    
    let mapa = new google.visualization.DataTable();

    mapa.addColumn(['string', 'Departamento']);
    mapa.addColumn('number', 'Valor');


    for (let i = 0; i < departamentos.length; i++) {

        let carreras = syscall.contarCarrerasPorDepto(departamentos[i]);

        mapa.addRow([departamentos[i], carreras]);
    }

    var options = {
        region: 'UY',
        resolution: 'provinces',
        displayMode: 'regions',
        colorAxis: {
            colors: ['#E8EEFA', '#003366'],
            minValue: 0,
            maxValue: cantidadCarreras
        },
        datalessRegionColor: '#f5f5f5',
        defaultColor: '#f5f5f5'
    };

    var chart = new google.visualization.GeoChart(document.getElementById('mapa'));
    chart.draw(mapa, options);
}


function dibujarMapaInscripciones() {
    let cantidadInscripciones = contarInscripciones();
    
    let mapa = new google.visualization.DataTable();

    mapa.addColumn(['string', 'Departamento']);
    mapa.addColumn('number', 'Valor');


    for (let i = 0; i < departamentos.length; i++) {

        let inscripciones = syscall.contarInscripcionesPorDepto(departamentos[i]);

        mapa.addRow([departamentos[i], inscripciones]);
    }

    var options = {
        region: 'UY',
        resolution: 'provinces',
        displayMode: 'regions',
        colorAxis: {
            colors: ['#E8EEFA', '#003366'],
            minValue: 0,
            maxValue: cantidadInscripciones
        },
        datalessRegionColor: '#f5f5f5',
        defaultColor: '#f5f5f5'
    };

    var chart = new google.visualization.GeoChart(document.getElementById('mapa'));
    chart.draw(mapa, options);
}

