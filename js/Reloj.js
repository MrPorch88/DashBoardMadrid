function mostrarHoras(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = ("0" + date.getMinutes()).slice(-2); // 0 - 59
    var s = ("0" + date.getSeconds()).slice(-2); // 0 - 59
    
    var time = h + ":" + m + ":" + s;
    document.getElementById("Reloj").innerText = time;
    document.getElementById("Reloj").textContent = time;
    
    setTimeout(mostrarHoras, 1000);
}

mostrarHoras();