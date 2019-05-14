var peticionURL = 'JSON/twitter.txt'; // Obtenemos los datos del JSON para hacer uso de ellos
var peticion = new XMLHttpRequest();
peticion.open('GET', peticionURL, true);
peticion.responseType = 'json';
peticion.send();


peticion.onload = function(){
    var contenido = peticion.response; // Guardamos la peticion del archivo JSON para poder usarlo
    console.log(contenido);
    obtenerDatos(contenido); 
}

function obtenerDatos(contenido){
    var tr;
    for (var i = 0; i < contenido.length; i++) { // Recorremos los contenidos del JSON
        tr = $('<tr/>');
        tr.append("<a href="+contenido[i].direccion+">" + contenido[i].texto + "</a>"); // Insertamos en la tag tr los contenidos de tendencia
        $("#datosTwitter").append(tr); // Definimos la etiqueta del tr para referirnos a ella y poder insertarla
    }
}
