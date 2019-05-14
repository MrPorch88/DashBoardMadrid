var bici;
var map;
var pins = [];
var trafficLayer;
var metroLayer;

function initMap() {
    var peticionDir = 'JSON/bici.txt';
    
    // Obtenemos los datos del JSON para hacer uso de ellos
    var peticion3 = new XMLHttpRequest();
    peticion3.open('GET', peticionDir, true);
    peticion3.responseType = 'json';
    peticion3.send();
    

    peticion3.onload = function(){
        bici = peticion3.response;
        mapa();
        trafico();
    }
}

function mapa(){
    var optionMap = {
        mapTypeControl: false,
        streetViewControl: false,
        zoom: 13,
        center: {lat: 40.429786, lng: -3.703790},
    };
    
    map = new google.maps.Map(document.getElementById("map"), optionMap);
    
    trafficLayer = new google.maps.TrafficLayer();
    metroLayer = new google.maps.TransitLayer();
}

function biciMad(){
    clearAll();
    $("h2#tituloMap").html("BiciMad <small>Localización y estado de las estaciones de BiciMad</small>");
    var infowindow = new google.maps.InfoWindow();
    var i;
    var verde = {
        url: 'images/BiciMad/BicimadVerde.png',
        size: new google.maps.Size(20, 20)
    };
    var amarillo = {
        url: 'images/BiciMad/BicimadAmarillo.png',
        size: new google.maps.Size(20, 20)
    };
    var rojo = {
        url: 'images/BiciMad/BicimadRojo.png',
        size: new google.maps.Size(20, 20)
    };
    var gris = {
        url: 'images/BiciMad/BicimadGris.png',
        size: new google.maps.Size(20, 20)
    };

    for (i = 0; i < bici.length; i++) {  // Recorremos los datos del JSON obtenido
        // Definimos los colores de la Bici segun disponibilidad de espacios, proporcionado por el archivo origen
        if(bici[i].operativo == "No"){
            var marker = new google.maps.Marker({
            position: {lat: parseFloat(bici[i].lat), lng: parseFloat(bici[i].lon)}, // Ponemos el marcador primero lat despues lon
            map: map,
            animation: google.maps.Animation.DROP,
            icon: gris
          });
        } else if(bici[i].vacias < 5){
            var marker = new google.maps.Marker({
            position: {lat: parseFloat(bici[i].lat), lng: parseFloat(bici[i].lon)}, 
            map: map,
            animation: google.maps.Animation.DROP,
            icon: rojo
          });
        } else if(bici[i].vacias < 10){
            var marker = new google.maps.Marker({
            position: {lat: parseFloat(bici[i].lat), lng: parseFloat(bici[i].lon)}, 
            map: map,
            animation: google.maps.Animation.DROP,
            icon: amarillo
          });
        } else {
            var marker = new google.maps.Marker({
            position: {lat: parseFloat(bici[i].lat), lng: parseFloat(bici[i].lon)}, 
            map: map,
            animation: google.maps.Animation.DROP,
            icon: verde
          }); 
        }

        // Mostramos en evento de 'click' el nombre de la parada. Se podria usar el campo direccion si lo preferimos
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {//barra n para diferentes lineas 
          infowindow.setContent(bici[i].nombre + "<br>" + bici[i].direccion + "<br>Total bases: " + bici[i].bases + "<br>Bicis ancladas: " + bici[i].ancladas + "<br>Anclajes libres: " + bici[i].vacias);
          infowindow.open(map, marker);
        }
        })(marker, i));
        pins.push(marker);
    }
}
    
function trafico() {
    clearAll();
    $("h2#tituloMap").html("Tráfico <small>Situacion del trafico en Madrid y alrededores</small>");
    trafficLayer.setMap(map);
}
function metro() {
    clearAll();
    $("h2#tituloMap").html("Metro y Cercanías <small>Líneas y estaciones de Metro y Cercanías de Madrid</small>");
    metroLayer.setMap(map);
}

function clearAll(){
    $("h2#tituloMap").html("Mapa <small>Mapa actualizado de Madrid</small>");
    trafficLayer.setMap(null);
    metroLayer.setMap(null);
    clearOverlays();
}

function clearOverlays() {
  for (var i = 0; i < pins.length; i++ ) {
    pins[i].setMap(null);
  }
  pins.length = 0;
}