var time;
var rates;
var cantidad = 1;
var currency = "";
var symbol;
function refreshData() {
    time =30;
    var requestURL = "https://api.exchangeratesapi.io/latest";
    var request = new XMLHttpRequest();
    
    request.open('GET', requestURL);   
    request.responseType = 'json';
    request.send();

    request.onload = function(){
        rates = request.response;
        if(currency == ""){
            useThis('USD', '$');
        }
    }
    
    setTimeout(refreshData, time * 1000000000); 
}
refreshData();

function setCantidad(){
    cantidad = document.getElementById("userInput").value;
    refresheandoMoneda();
}

function useThis(divisa, simbolo) {
    $("#userInput").attr("placeholder", divisa + " " + simbolo);
    currency = divisa;
    symbol = simbolo;
    refresheandoMoneda();
    ocultamiento();
}

function refresheandoMoneda(){
    cantidad = document.getElementById("userInput").value;
    if(cantidad == 0){
        cantidad = 1;
    }
    var moneda = rates['rates'][currency];
    var solucion = (cantidad / moneda) ;
    $('#finalCurr').html(cantidad + symbol + ' = ' + solucion.toFixed(3) + '€');
}