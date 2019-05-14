// Obtenemos los datos del JSON para hacer uso de ellos
var salidaURL = 'JSON/departures.txt';
var salida = new XMLHttpRequest();
salida.open('GET', salidaURL, true);
salida.responseType = 'json';
salida.send();

salida.onload = function () {
    
    // Guardamos la peticion del archivo JSON para poder usarlo
    var contenido = salida.response;
    
    obtenerDatos(contenido);
}

function obtenerDatos(content){
    
    // Recorremos los contenidos del JSON
    for (var i = 0; i < content.length; i++) {
        
        var tr="<tr>";

        var td1= '<td><h5>' + content[i].flightNumber+ '</h5></td>';
        var td2= '<td><img src="images/Aeropuertos/LOGOS/' + content[i].carrier + '.png"></img></td>';
        var td3= '<td>' + content[i].airportArrival + '</td>';
        
        if(content[i].status == 'A'){
            var td4= '<td>Activo</td>';
        }
        
        if(content[i].status == 'C'){
            var td4= '<td>Cancelado</td>';
        }
        
        if(content[i].status == 'D'){
            var td4= '<td>Desviado</td>';
        }
        
        if(content[i].status == 'DN'){
            var td4= '<td>Necesario Origen Datos</td>';
        }
        
        if(content[i].status == 'L'){
            var td4= '<td>Aterrizado</td>';
        }
        
        if(content[i].status == 'NO'){
            var td4= '<td>No Operativo</td>';
        }
        
        if(content[i].status == 'R'){
            var td4= '<td>Redirigido</td>';
        }
        
        if(content[i].status == 'S'){
            var td4= '<td>En Hora</td>';
        }
        
        if(content[i].status == 'U'){
            var td4= '<td>Desconocido</td>';
        }
        
        //Definimos el formato de la hora, para que sea mas amigable
        var conten = "";
        for(var j = 0; j < content[i].publishedDep.length; j++){
            if(j > 10 && j < 19){
                conten += content[i].publishedDep[j];
            }
        }
        
        var td5= '<td>' + conten + '</td>';
        
        conten = "";
        for(var j = 0; j < content[i].publishedDep.length; j++){
            if(j > 10 && j < 19){
                conten += content[i].publishedArr[j];
            }
        }
        
        var td6= '<td>' + conten + '</td>';
        var td7= '<td>' + content[i].terminalDep + '</td>';
        
        //añadimos a la tabla todo lo que hemos generado en esta fila y pasamos a la siguiente.
        $("#datosSalidas").append(tr+td1+td2+td3+td4+td5+td6+td7+'</tr>');

    }
}