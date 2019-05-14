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

var despegue = 'images/despegue.png';

function obtenerDatosLl(contentLl){
    
    // Recorremos los contenidos del JSON
    for (var i = 0; i < contentLl.length; i++) {
        
        var ltr="<tr>";

        var ltd1= '<td><h5>' + contentLl[i].flightNumber+ '</h5></td>';
        var ltd2= '<td><img src="images/Aeropuertos/LOGOS/' + contentLl[i].carrier + '.png"></img></td>';
        var ltd3= '<td>' + contentLl[i].airportDeparture + '</td>';
        var ltd4;
        if(contentLl[i].status == 'A'){
            ltd4= '<td>Activo</td>';
        }
        
        if(contentLl[i].status == 'C'){
            ltd4= '<td>Cancelado</td>';
        }
        
        if(contentLl[i].status == 'D'){
            ltd4= '<td>Diverted</td>';
        }
        
        if(contentLl[i].status == 'DN'){
            ltd4= '<td>Necesario Origen Datos</td>';
        }
        
        if(contentLl[i].status == 'L'){
            ltd4= '<td>Aterrizado</td>';
        }
        
        if(contentLl[i].status == 'NO'){
            ltd4= '<td>Not Operativo</td>';
        }
        
        if(contentLl[i].status == 'R'){
            ltd4= '<td>Redirigido</td>';
        }
        
        if(contentLl[i].status == 'S'){
            ltd4= '<td>En Hora</td>';
        }
        
        if(contentLl[i].status == 'U'){
            ltd4= '<td>Desconocida</td>';
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
    
function obtenerDatosS(content){
    
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



function cambiarTituloA(nombre){
    $("#tituloAer").text("Aeropuerto Adolfo Suarez - " + nombre);
}