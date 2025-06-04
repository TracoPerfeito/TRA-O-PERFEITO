const modal = document.getElementById('editarPerfilModal');
const btn = document.getElementById('editarperfilbotao');
const span = document.getElementsByClassName('close')[0];

btn.onclick = function () {
  modal.style.display = 'block';
}

// Fecha o modal ao clicar no X
span.onclick = function () {
  modal.style.display = 'none';
}

// Fecha o modal ao clicar fora dele
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
} 



function loadImg(event) {
    var imgPreview = document.getElementById('img-preview');
    imgPreview.src = URL.createObjectURL(event.target.files[0]);
}

