let touchStartX = 0;
let touchEndX = 0;

function mostrarControles(section) {
  section.classList.add('ativo');
}

function esconderControles(section) {
  section.classList.remove('ativo');
}

function updateCarrossel(carrossel, novoIndice) {
  const imgs = carrossel.querySelectorAll('.publicacao-img');
  const indicadores = carrossel.querySelectorAll('.indicador');
  const container = carrossel.querySelector('.container-imgs');
  const total = imgs.length;

  novoIndice = Math.max(0, Math.min(novoIndice, total - 1));
  container.style.transform = `translateX(-${novoIndice * 100}%)`;

  indicadores.forEach((el, idx) => el.classList.toggle('ativo', idx === novoIndice));
  carrossel.dataset.idx = novoIndice;

  const setaEsq = carrossel.querySelector('.seta-carrossel.esquerda');
  const setaDir = carrossel.querySelector('.seta-carrossel.direita');

  if (setaEsq) setaEsq.classList.toggle('inativa', novoIndice === 0);
  if (setaDir) setaDir.classList.toggle('inativa', novoIndice === total - 1);

  
}


function nextImg(btn) {
  const carrossel = btn.closest('.carrossel-imagens-explorar');
  const idx = parseInt(carrossel.dataset.idx || '0');
  updateCarrossel(carrossel, idx + 1);
}

function prevImg(btn) {
  const carrossel = btn.closest('.carrossel-imagens-explorar');
  const idx = parseInt(carrossel.dataset.idx || '0');
  updateCarrossel(carrossel, idx - 1);
}

function startSwipe(e, container) {
  touchStartX = e.touches[0].clientX;
}

function swipeMove(e) {
  touchEndX = e.touches[0].clientX;
}

function endSwipe(e, container) {
  const carrossel = container.closest('.carrossel-imagens-explorar');
  const idx = parseInt(carrossel.dataset.idx || '0');

  if (touchStartX - touchEndX > 50) {
    updateCarrossel(carrossel, idx + 1);
  } else if (touchEndX - touchStartX > 50) {
    updateCarrossel(carrossel, idx - 1);
  }

}