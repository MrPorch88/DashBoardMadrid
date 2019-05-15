/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function abrirDrop() {
  document.getElementById("myDropdown").classList.toggle("show");
}


/* Anything that gets to the document
   will hide the dropdown */
$(document).click(function(){
    ocultamiento();
});

function ocultamiento(){
    var dropdowns = document.getElementsByClassName("dropdown-content_");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
}
/* Clicks within the dropdown won't make
   it past the dropdown itself */
$("#myDropdown").click(function(e){
  e.stopPropagation();
});

$(".dropbtn").click(function(e){
  e.stopPropagation();
});
