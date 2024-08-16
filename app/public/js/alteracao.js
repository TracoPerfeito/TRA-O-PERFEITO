// Pegando os elementos
var dropdown = document.getElementById("editarperfil-suspenso");
var btn = document.getElementById("editarperfilbotao");
 
// Quando o botão for clicado, a dropdown será mostrada ou escondida
btn.onclick = function() {
if (dropdown.style.display === "block") {
dropdown.style.display = "none";
    } else {
dropdown.style.display = "block";
    }
}
 
