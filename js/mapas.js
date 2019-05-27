var bici;
var map;
var pins = [];
var trafficLayer;
var metroLayer;
var lineasEMTLista;
var todasParadasPorLinea;

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

    var peticionEMT = 'JSON/lineasEMTLista.txt';

    var peticion4 = new XMLHttpRequest();
    peticion4.open('GET', peticionEMT, true);
    peticion4.responseType = 'json';
    peticion4.send();
    
    peticion4.onload = function(){
        lineasEMTLista = peticion4.response;
        cargarLineasAutobuses()
    }

    var peticionEMT2 = 'JSON/lineasEMTParadas.txt';

    var peticion5 = new XMLHttpRequest();
    peticion5.open('GET', peticionEMT2, true);
    peticion5.responseType = 'json';
    peticion5.send();
    
    peticion5.onload = function(){
        todasParadasPorLinea = peticion5.response;
    }
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("miInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("dropdownEMTLineas");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}
function cargarLineasAutobuses(){
    for(var i = 0; i < lineasEMTLista.length; i++){
        $("#dropdownEMTLineas").append('<a class="waves-effect waves-block"><button  style="text-decoration:none;" onClick="mostrarLineaEMT(' + lineasEMTLista[i].lineaId + ', 1)" class="boton2">' + lineasEMTLista[i].lineaId + ' - ' + lineasEMTLista[i].nombre + ' [IDA]</button></a>');
        $("#dropdownEMTLineas").append('<a class="waves-effect waves-block"><button  style="text-decoration:none;" onClick="mostrarLineaEMT(' + lineasEMTLista[i].lineaId + ', 2)" class="boton2">' + lineasEMTLista[i].lineaId + ' - ' + lineasEMTLista[i].nombre + ' [VUELTA]</button></a>');
    }
}

function mostrarLineaEMT(linea, direccion){
    clearAll();
    idLinea = 'Linea_' + linea;
    
    map.setCenter({lat: 40.429786, lng: -3.703790});
    map.setZoom(12);


    var infowindow = new google.maps.InfoWindow();
    var i;
    var paradas;
    var gris = {
        url: 'images/Bus/Bus.png',
        size: new google.maps.Size(20, 20)
    };
    if(direccion == 1){
        paradas = todasParadasPorLinea[idLinea].paradasIda;
        $("h2#tituloMap").html("Linea " + linea + " <small>" + todasParadasPorLinea[idLinea].nombre + " - IDA</small>");
    } else {
        paradas = todasParadasPorLinea[idLinea].paradasVue;
        $("h2#tituloMap").html("Linea " + linea + " <small>" + todasParadasPorLinea[idLinea].nombre + " - VUELTA</small>");
    }

    for (i = 0; i < paradas.length; i++) {  
        var marker = new google.maps.Marker({
            position: {lat: parseFloat(paradas[i].lat), lng: parseFloat(paradas[i].lon)}, 
            map: map,
            animation: google.maps.Animation.DROP,
            icon: gris
        });
        // Mostramos en evento de 'click' el nombre de la parada. Se podria usar el campo direccion si lo preferimos
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {//barra n para diferentes lineas 
          infowindow.setContent("<h5>" + paradas[i].nombre + "</h5></br>Otras Lineas </br>" + paradas[i].otrasLineas);
          infowindow.open(map, marker);
        }
        })(marker, i));
        pins.push(marker);
    }
}

function mapa(){
    var optionMap = {
        mapTypeControl: false,
        streetViewControl: false,
        zoom: 12,
        center: {lat: 40.429786, lng: -3.703790},
    };
    
    map = new google.maps.Map(document.getElementById("map"), optionMap);
    
    trafficLayer = new google.maps.TrafficLayer();
    metroLayer = new google.maps.TransitLayer();
}

function biciMad(){
    clearAll();
    $("h2#tituloMap").html("BiciMad <small>Localización y estado de las estaciones de BiciMad</small>");
    
    // Comprobamos la GeoLocalizacion
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Exito
            setLocaliz, 
            // Error
            null, 
            
            {
               enableHighAccuracy: true,
               timeout: 5000,
               maximumAge: 0
            });
    } else { 
        x.innerHTML = "No se soporta la geolocalizacion.";
    }
    

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


function setLocaliz(position) {
    map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
    var posGeo = new google.maps.Marker({
        position: {lat: position.coords.latitude, lng: position.coords.longitude}, 
        map: map,
        animation: google.maps.Animation.DROP,
      }); 
    pins.push(posGeo);
    map.setZoom(14);
}


    
function trafico() {
    clearAll();
    $("h2#tituloMap").html("Tráfico <small>Situacion del trafico en Madrid y alrededores</small>");
    trafficLayer.setMap(map);
    map.setCenter({lat: 40.429786, lng: -3.703790});
    map.setZoom(12);
}
function metro() {
    clearAll();
    $("h2#tituloMap").html("Metro y Cercanías <small>Líneas y estaciones de Metro y Cercanías de Madrid</small>");
    metroLayer.setMap(map);
    map.setCenter({lat: 40.429786, lng: -3.703790});
    map.setZoom(12);
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