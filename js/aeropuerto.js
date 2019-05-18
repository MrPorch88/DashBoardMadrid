// Obtenemos los datos del JSON para hacer uso de ellos
var salidaURL = 'JSON/departures.txt';
var llegadaURL = 'JSON/arrivals.txt';
var salida = new XMLHttpRequest();
var llegada = new XMLHttpRequest();
salida.open('GET', salidaURL, true);
llegada.open('GET', llegadaURL, true);
salida.responseType = 'json';
llegada.responseType = 'json';
salida.send();
llegada.send();

salida.onload = function () {
    
    // Guardamos la peticion del archivo JSON para poder usarlo
    var contenido = salida.response;
    
    obtenerDatosS(contenido);
}

llegada.onload = function () {

    // Guardamos la peticion del archivo JSON para poder usarlo
    var contenid = llegada.response;

    obtenerDatosLl(contenid);
}

//var despegue = 'images/despegue.png';

function obtenerDatosLl(contentLl){
    
    // Recorremos los contenidos del JSON
    for (var i = 0; i < contentLl.length; i++) {
        
        var ltr="<tr>";

        var ltd1= '<td><h5>' + contentLl[i].flightNumber+ '</h5></td>';
        var ltd2= '<td><img src="images/Aeropuertos/LOGOS/' + contentLl[i].carrier + '.png"></img></td>';
        var ltd3= '<td>' + contentLl[i].airportDeparture + '</td>';
        var ltd4;
        var valLl = contentLl[i].status
        switch(valLl){
            case 'A':
                ltd4= '<td>Activo</td>';
                break;
            case 'C':
                ltd4= '<td>Cancelado</td>';
                break;
            case 'D':
                ltd4= '<td>Desviado</td>';
                break;
            case 'DN':
                ltd4= '<td>Necesario Origen Datos</td>';
                break;
            case 'L':
                ltd4= '<td>Aterrizado</td>';
                break;
            case 'NO':
                ltd4= '<td>Not Operativo</td>';
                break;
            case 'R':
                ltd4= '<td>Redirigido</td>';
                break;
            case 'S':
                ltd4= '<td>En Hora</td>';
                break;
            case 'U':
                ltd4= '<td>Desconocida</td>';
                break;
        }

        //Definimos el formato de la hora, para que sea mas amigable
        var lconten = "";
        for(var j = 0; j < contentLl[i].publishedDep.length; j++){
            if(j > 10 && j < 19){
                lconten += contentLl[i].publishedDep[j];
            }
        }
        
        var ltd5= '<td>' + lconten + '</td>';
        
        lconten = "";
        for(var j = 0; j < contentLl[i].publishedDep.length; j++){
            if(j > 10 && j < 19){
                lconten += contentLl[i].publishedArr[j];
            }
        }
        
        var ltd6= '<td>' + lconten + '</td>';
        var ltd7= '<td>' + contentLl[i].terminalArr + '</td>';
        
        //añadimos a la tabla todo lo que hemos generado en esta fila y pasamos a la siguiente.
        $("#datosLlegadas").append(ltr+ltd1+ltd2+ltd3+ltd4+ltd5+ltd6+ltd7+'</tr>');

    }
}
    
function obtenerDatosS(contentS){
    
    // Recorremos los contenidos del JSON
    for (var i = 0; i < contentS.length; i++) {
        
        var tr="<tr>";

        var std1= '<td><h5>' + contentS[i].flightNumber+ '</h5></td>';
        var std2= '<td><img src="images/Aeropuertos/LOGOS/' + contentS[i].carrier + '.png"></img></td>';
        var std3= '<td>' + contentS[i].airportArrival + '</td>';
        var std4;
        var valS = contentS[i].status
        switch(valS){
            case 'A':
                std4= '<td>Activo</td>';
                break;
            case 'C':
                std4= '<td>Cancelado</td>';
                break;
            case 'D':
                std4= '<td>Desviado</td>';
                break;
            case 'DN':
                std4= '<td>Necesario Origen Datos</td>';
                break;
            case 'L':
                std4= '<td>Aterrizado</td>';
                break;
            case 'NO':
                std4= '<td>Not Operativo</td>';
                break;
            case 'R':
                std4= '<td>Redirigido</td>';
                break;
            case 'S':
                std4= '<td>En Hora</td>';
                break;
            case 'U':
                std4= '<td>Desconocida</td>';
                break;
        }
        
        //Definimos el formato de la hora, para que sea mas amigable
        var conten = "";
        for(var j = 0; j < contentS[i].publishedDep.length; j++){
            if(j > 10 && j < 19){
                conten += contentS[i].publishedDep[j];
            }
        }
        
        var std5= '<td>' + conten + '</td>';
        
        conten = "";
        for(var j = 0; j < contentS[i].publishedDep.length; j++){
            if(j > 10 && j < 19){
                conten += contentS[i].publishedArr[j];
            }
        }
        
        var std6= '<td>' + conten + '</td>';
        var std7= '<td>' + contentS[i].terminalDep + '</td>';
        
        //añadimos a la tabla todo lo que hemos generado en esta fila y pasamos a la siguiente.
        
        $("#datosSalidas").append(tr+std1+std2+std3+std4+std5+std6+std7+'</tr>');

    }
}



function cambiarTituloA(nombre){
    $("#tituloAer").text("Aeropuerto Adolfo Suarez - " + nombre);
}