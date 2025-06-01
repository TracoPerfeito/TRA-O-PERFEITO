const modal = document.getElementById('modalDenuncia');
const fecharModal = document.getElementById('fecharModal');
const formDenuncia = document.getElementById('formDenuncia');
 
        document.querySelectorAll('.btn-denunciar').forEach(botao => {
        botao.addEventListener('click', function() {
        modal.style.display = 'block';
        });
     });
 
         fecharModal.addEventListener('click', function() {
         modal.style.display = 'none';
         });
 
         formDenuncia.addEventListener('submit', function(event) {
        event.preventDefault();
         const motivo = formDenuncia.motivo.value;
         if (motivo) {
         alert('Publicação denunciado com o motivo: ' + motivo);
         modal.style.display = 'none';
        } else {
              alert('Selecione um motivo para a denúncia.');
        }
         });



         
document.querySelectorAll('.icone-menu').forEach(icone => {
        icone.addEventListener('click', function (e) {
            e.stopPropagation(); 
            const menu = this.parentElement;
            menu.classList.toggle('ativo');
        });
    });

    // fechar ao clicar fora
    document.addEventListener('click', () => {
        document.querySelectorAll('.menu-opcoes').forEach(menu => {
            menu.classList.remove('ativo');
        });
    });