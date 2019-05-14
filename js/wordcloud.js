var frequency_list = [];
var width = 350,
    height = 400;
var peticionURL = 'JSON/twitter.txt';
 // Obtenemos los datos del JSON para hacer uso de ellos
var peticion2 = new XMLHttpRequest();
peticion2.open('GET', peticionURL, true);
peticion2.responseType = 'json';
peticion2.send();


peticion2.onload = function(){
    var contenido = peticion2.response;
 // Guardamos la peticion del archivo JSON para poder usarlo
    rellenar(contenido);
}

function rellenar(contenido) {
    for (var i = 0; i<contenido.length; i++){
        frequency_list[i] = contenido[i].texto;
    }

    var color = d3.scale.linear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(["#ff5733", "#daff33", "#e333ff", "#f52986", "#f5f81f", "#fb9d16", "#16fb7b", "#16fbdf", "#555", "#444", "#333", "#222"]);

        d3.layout.cloud().size([width, height])
            .words([{"text": frequency_list[0], "size": 50},{"text": frequency_list[1], "size": 40},{"text": frequency_list[2], "size": 30},{"text": frequency_list[3], "size": 26},
                   {"text": frequency_list[4], "size": 22},{"text": frequency_list[5], "size": 21},{"text": frequency_list[6], "size": 20},{"text": frequency_list[7], "size": 19},
                   {"text": frequency_list[8], "size": 19},{"text": frequency_list[9], "size": 19}])
            .padding(3)
            .rotate(0)
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

    function draw(words) {
        d3.select("#word-cloud").append("svg")
                //.attr("width", width)
                //.attr("height", height)
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area 320
                .attr("transform", "translate(0,200)")
                .attr("transform", "translate("+170+","+(height/2)+")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", function(d, i) { return color(i); })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
    }
}