// Obtenemos los datos del JSON para hacer uso de ellos
var llegadaURL = 'JSON/arrivals.txt';
var llegada = new XMLHttpRequest();
llegada.open('GET', llegadaURL, true);
llegada.responseType = 'json';
llegada.send();

llegada.onload = function () {

    // Guardamos la peticion del archivo JSON para poder usarlo
    var contenidoLl = llegada.response;

    obtenerDatosLl(contenidoLl);
}

function obtenerDatosLl(contentLl){
    
    // Recorremos los contenidos del JSON
    for (var i = 0; i < contentLl.length; i++) {
        
        var tr="<tr>";

        var td1= '<td><h5>' + contentLl[i].flightNumber+ '</h5></td>';
        var td2= '<td><img src="images/Aeropuertos/LOGOS/' + contentLl[i].carrier + '.png"></img></td>';
        var td3= '<td>' + contentLl[i].airportDeparture + '</td>';
        
        if(contentLl[i].status == 'A'){
            var td4= '<td>Activo</td>';
        }
        
        if(contentLl[i].status == 'C'){
            var td4= '<td>Cancelado</td>';
        }
        
        if(contentLl[i].status == 'D'){
            var td4= '<td>Diverted</td>';
        }
        
        if(contentLl[i].status == 'DN'){
            var td4= '<td>Necesario Origen Datos</td>';
        }
        
        if(contentLl[i].status == 'L'){
            var td4= '<td>Aterrizado</td>';
        }
        
        if(contentLl[i].status == 'NO'){
            var td4= '<td>Not Operativo</td>';
        }
        
        if(contentLl[i].status == 'R'){
            var td4= '<td>Redirigido</td>';
        }
        
        if(contentLl[i].status == 'S'){
            var td4= '<td>En Hora</td>';
        }
        
        if(contentLl[i].status == 'U'){
            var contentLltd4= '<td>Desconocida</td>';
        }

        //Definimos el formato de la hora, para que sea mas amigable
        var conten = "";
        for(var j = 0; j < contentLl[i].publishedDep.length; j++){
            if(j > 10 && j < 19){
                conten += contentLl[i].publishedDep[j];
            }
        }
        
        var td5= '<td>' + contentLl + '</td>';
        
        conten = "";
        for(var j = 0; j < contentLl[i].publishedDep.length; j++){
            if(j > 10 && j < 19){
                conten += contentLl[i].publishedArr[j];
            }
        }
        
        var td6= '<td>' + contentLl + '</td>';
        var td7= '<td>' + contentLl[i].terminalArr + '</td>';
        
        //añadimos a la tabla todo lo que hemos generado en esta fila y pasamos a la siguiente.
        $("#datosLlegadas").append(tr+td1+td2+td3+td4+td5+td6+td7+'</tr>');

    }
}