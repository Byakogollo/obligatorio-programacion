
    






google.charts.load('current', {
        'packages':['geochart'],
      });
      google.charts.setOnLoadCallback(drawRegionsMap);


      function contarCarreras(){
      let cantidadCarreras;
      if (syscall.listacarreras.length != 0){
        cantidadCarreras = syscall.listacarreras.length;
      }else{
        cantidadCarreras=0;
      }
      return cantidadCarreras;
      }


      function drawRegionsMap() {
        let cantidadCarreras = parseInt(contarCarreras());
        var data = google.visualization.arrayToDataTable([
        
            ['Departamento', 'Carreras'],
          
          ['UY-MO',cantidadCarreras],
          ['UY-CA', cantidadCarreras],
          ['UY-MA', cantidadCarreras],
          ['UY-RO', cantidadCarreras],
          ['UY-TT',cantidadCarreras],
          ['UY-CL', cantidadCarreras],
          ['UY-RV', cantidadCarreras],
          ['UY-AR', cantidadCarreras],
          ['UY-SA', cantidadCarreras],
          ['UY-PA', cantidadCarreras],
          ['UY-RN', cantidadCarreras],
          ['UY-SO', cantidadCarreras],
          ['UY-CO', cantidadCarreras],
          ['UY-SJ', cantidadCarreras],
          ['UY-FS', cantidadCarreras],
          ['UY-FD',cantidadCarreras ],
          ['UY-LA',cantidadCarreras ],
          ['UY-DU', cantidadCarreras],
          ['UY-TA', cantidadCarreras]
         ]);

         var options = {
          region: 'UY', 
          resolution: 'provinces',
          displayMode: 'regions',
          colorAxis: {colors: ['#ffffff', '#003366'],
            minValue: 0,
            maxValue: cantidadCarreras
          }, 
          datalessRegionColor: '#f5f5f5',
          defaultColor: '#f5f5f5'
        };


        var chart = new google.visualization.GeoChart(document.getElementById('mapa'));

        chart.draw(data, options);
      }