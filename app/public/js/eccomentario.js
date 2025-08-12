document.querySelectorAll('.icone-menu-coment').forEach(icone => {
  icone.addEventListener('click', e => {
    e.stopPropagation();
    const menu = icone.parentElement.querySelector('.opcoes-menu-coment');
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      // Fecha todos os outros menus antes de abrir este
      document.querySelectorAll('.opcoes-menu-coment').forEach(m => m.style.display = 'none');
      menu.style.display = 'block';
    }
  });
});

// Fecha menus ao clicar fora
document.addEventListener('click', () => {
  document.querySelectorAll('.opcoes-menu-coment').forEach(menu => {
    menu.style.display = 'none';
  });
});

const modalExcluirComentario = document.getElementById('modalExcluirComentario');
const modalDenunciarComentario = document.getElementById('modalDenunciarComentario');

const inputExcluirComentario = document.getElementById('excluirComentarioId');
const inputDenunciarComentario = document.getElementById('denunciarComentarioId');

// Abre modal Excluir ao clicar no botão
document.querySelectorAll('.btn-excluir-comentario').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const id = btn.closest('.menu-opcoes-coment').dataset.idComentario;
    inputExcluirComentario.value = id;
    modalExcluirComentario.classList.remove('hidden');
    btn.closest('.opcoes-menu-coment').style.display = 'none';
  });
});

// Abre modal Denunciar ao clicar no botão
document.querySelectorAll('.btn-denunciar-comentario').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const id = btn.closest('.menu-opcoes-coment').dataset.idComentario;
    inputDenunciarComentario.value = id;
    modalDenunciarComentario.classList.remove('hidden');
    btn.closest('.opcoes-menu-coment').style.display = 'none';
  });
});

// Fecha modais ao clicar no botão cancelar
document.querySelectorAll('.btn-fechar-modal-coment').forEach(btn => {
  btn.addEventListener('click', () => {
    modalExcluirComentario.classList.add('hidden');
    modalDenunciarComentario.classList.add('hidden');
  });
});

// Fecha modal clicando fora do conteúdo
[modalExcluirComentario, modalDenunciarComentario].forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
});