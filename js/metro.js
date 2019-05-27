function refreshMetro(){  
    var requestURL = 'JSON/metro.txt'; //Cogemos el txt que contiene la informacion en JSON
    var request = new XMLHttpRequest();
    request.open('GET', requestURL, true);
    request.responseType = 'json'; //Lo parseamos como JSON
    request.send();

    request.onload = function(){
        content = request.response;
        populateTable(content); // llamamos a la funcion con los datos en JSON que hemos sacado del txt
    }

    function populateTable(content){
        for(var i=0; i<content.length; i++) { //recorremos todas las lineas de metro, para sacar los iconos tenemos que hacerlo dependiendo de qué linea es
            if(i < content.length / 2){
            //Como las unicas lineas que se sacan diferentes son impares, sacamos con la misma linea todas las imagenes
                if(i == 5){ // si la linea es la 5a tenemos que añadir circular al link de la imagen
                    var td1='<tr><td><img src="https://www.metromadrid.es/themes/custom/buson8/images/icons-line/' + content[i].linea+ '-circular.svg" alt="' + content[i].linea + ' circular" id="imgMetro"></td>';
                } else if(i == 11){// si la linea es la 11a tenemos que añadir metrosur al link  de la imagen
                    var td1='<tr><td><img src="https://www.metromadrid.es/themes/custom/buson8/images/icons-line/' + content[i].linea+ '-metrosur.svg" alt="' + content[i].linea + ' metro sur" id="imgMetro"></td>';
                } else { //en todo lo demas el icono se saca con el nombre de la linea tal cual
                    var td1='<tr><td><img src="https://www.metromadrid.es/themes/custom/buson8/images/icons-line/' + content[i].linea+ '.svg" alt="' + content[i].linea + '" id="imgMetro"></td>';
                }
                //añadimos en la cuarta columna los datos de la linea
                var td2 = '<td><button type="button" class="btn bg-' + content[i].color + ' waves-effect" data-trigger="focus" data-container="body" data-toggle="popover" data-placement="top" data-content="' + content[i].descripcion + '" data-original-title="Incidencias">' + content[i].circulacion + '</button></td></tr>';
                //añadimos a la tabla todo lo que hemos generado en esta fila y pasamos a la siguiente.
                $("#datosTabla1").append(td1+td2);
            } else{
                //Como las unicas lineas que se sacan diferentes son impares, sacamos con la misma linea todas las imagenes
                if(i == 5){ // si la linea es la 5a tenemos que añadir circular al link de la imagen
                    var td1='<tr><td><img src="https://www.metromadrid.es/themes/custom/buson8/images/icons-line/' + content[i].linea+ '-circular.svg" alt="' + content[i].linea + ' circular" id="imgMetro"></td>';
                } else if(i == 11){// si la linea es la 11a tenemos que añadir metrosur al link  de la imagen
                    var td1='<tr><td><img src="https://www.metromadrid.es/themes/custom/buson8/images/icons-line/' + content[i].linea+ '-metrosur.svg" alt="' + content[i].linea + ' metro sur" id="imgMetro"></td>';
                } else { //en todo lo demas el icono se saca con el nombre de la linea tal cual
                    var td1='<tr><td><img src="https://www.metromadrid.es/themes/custom/buson8/images/icons-line/' + content[i].linea+ '.svg" alt="' + content[i].linea + '" id="imgMetro"></td>';
                }
                //añadimos en la cuarta columna los datos de la linea
                var td2 = '<td><button type="button" class="btn bg-' + content[i].color + ' waves-effect" data-trigger="focus" data-container="body" data-toggle="popover" data-placement="top" data-content="' + content[i].descripcion + '" data-original-title="Incidencias">' + content[i].circulacion + '</button></td></tr>';
                //añadimos a la tabla todo lo que hemos generado en esta fila y pasamos a la siguiente.
                $("#datosTabla2").append(td1+td2);
            }
        }
        setTimeout(arreglos(), 700);
    }
}
refreshMetro();