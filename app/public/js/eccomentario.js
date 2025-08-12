// Modal Denúncia

const modalDenuncia = document.getElementById('modalDenuncia');
const fecharModalDenuncia = document.getElementById('fecharModal');
const formDenuncia = document.getElementById('formDenuncia');

document.querySelectorAll('.btn-denunciar').forEach(botao => {
  botao.addEventListener('click', function() {
    modalDenuncia.style.display = 'block';
  });
});

fecharModalDenuncia.addEventListener('click', function() {
  modalDenuncia.style.display = 'none';
});

formDenuncia.addEventListener('submit', function(event) {
  event.preventDefault();
  const motivo = formDenuncia.motivo.value;
  if (motivo) {
    alert('Publicação denunciada com o motivo: ' + motivo);
    modalDenuncia.style.display = 'none';
  } else {
    alert('Selecione um motivo para a denúncia.');
  }
});













//apagar comentario


function openModalExcluir() {
  document.getElementById('modalexcluircomentario').style.display = 'flex';
}

function closeModalExcluir() {
  document.getElementById('modalexcluircomentario').style.display = 'none';
}


// document.addEventListener('DOMContentLoaded', () => {
//   const modalExcluirComentario = document.getElementById('modalexcluircomentario');
//   const btnCancelarExcluir = document.getElementById('cancelarExcluir');
//   const btnConfirmarExcluir = document.getElementById('confirmarExcluir');

//   document.querySelectorAll('.btn-excluir-comentario').forEach(botao => {
//     botao.addEventListener('click', () => {
//       modalExcluirComentario.style.display = 'flex';
//     });
//   });

//   btnCancelarExcluir.addEventListener('click', () => {
//     modalExcluirComentario.style.display = 'none';
//   });

//   btnConfirmarExcluir.addEventListener('click', () => {
//     modalExcluirComentario.style.display = 'none';
//     alert('Comentário excluído! (implemente a exclusão real)');
//   });
// });
