const filterButton = document.getElementById('botao-filtro');
const filterSidebar = document.getElementById('secao-filtro');
const closeButton = document.getElementById('fechar-aba');
const applyButton = document.getElementById('aplicar-filtros');

// Alterna a abertura/fechamento da barra de filtros ao clicar no botão de filtro
filterButton.addEventListener('click', () => {
  filterSidebar.classList.toggle('open');
});

// Fecha a barra de filtros ao clicar no botão "X"
closeButton.addEventListener('click', () => {
  filterSidebar.classList.remove('open');
});

// Fecha a barra de filtros ao clicar no botão "Aplicar"
applyButton.addEventListener('click', () => {
  filterSidebar.classList.remove('open');

});


 // Coisinha que abre lá na seção de filtro

 const categories = document.querySelectorAll('.categoria-filtro');

 categories.forEach(category => {
     category.addEventListener('click', () => {
         const caret = category.querySelector('.caret');
         const options = category.nextElementSibling;

         options.style.display = options.style.display === 'block' ? 'none' : 'block';
         caret.classList.toggle('open'); // Faz o trequinho girar quando clicamos nele
     });
 });