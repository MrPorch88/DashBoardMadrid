var x;
function refreshData()
{
    x = 30;  // Seconds

    //Inicializamos todos los sitios que queremos cambiar en
    var tempT = document.querySelector('#climaTemp');

    //cogemos la url de la que sacamos los datos de la api
    var requestURL = 'https://api.openweathermap.org/data/2.5/weather?id=3117735&appid=f47b2996462bbedb5bf7f86b7e415ac2';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json'; // lo parseamos a JSON
    request.send();

    request.onload = function(){
        var tiempo = request.response;
        populateTable(tiempo);
    }

    function populateTable(jsonObj){
        tempT.textContent = Number.parseInt(jsonObj['main'].temp - 273.15) + 'ºC'; //metemos la temperatura en el documento, pasandolo a celsius ya que nos lo da en kelvin
        $('#climaImg').removeAttr('img').replaceWith('<span id="climaImg"><img height="80" width="80" style="width: 80px; height: 80px; background: url(&quot;&quot;) no-repeat;" alt="title" src="https://openweathermap.org/img/w/' + jsonObj['weather'][0].icon + '.png"/></span>'); //metemos la imagen que nos da la api 
    }
    setTimeout(refreshData, x*1000);
}


refreshData(); // execute function again
    
