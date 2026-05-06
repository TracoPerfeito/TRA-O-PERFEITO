// contador de caracteres para textarea de descricao 


 const textarea = document.getElementById('textarea');
           const contador = document.getElementById('contador');
           const max = 500;
  
           function atualizarContador() {
          if (textarea.value.length > max) {
            textarea.value = textarea.value.slice(0, max); // corta o excesso
          }
          const restante = max - textarea.value.length;
          contador.textContent = `${restante} caractere${restante === 1 ? '' : 's'} restante${restante === 1 ? '' : 's'}`;
           }
  
           textarea.addEventListener('input', atualizarContador);
  
           // Atualiza ao carregar a página
           atualizarContador();


// Não deixa enviar o formulário de alterar tipo usuário se a pessoa não tiver selecionado "profissional"

     document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-tipo-usuario");
    if (!form) return;

    const tipoSelect = form.querySelector("#tipoUsuario");
    const submitButton = form.querySelector("button[type='submit']");
    const tipoAtual = "<%= tipo_usuario %>";

    // Inicialmente desativa o botão
    submitButton.disabled = true;

    tipoSelect.addEventListener("change", function () {
      if (this.value === "" || this.value === tipoAtual) {
        submitButton.disabled = true;
      } else {
        submitButton.disabled = false;
      }
    });
  });




// Para modal de confirmação para a desativação da conta 


function AbrirModalDesativarConta() {
  document.getElementById("modal-desativar").style.display = "flex";
}

function FecharModalDesativarConta() {
  const modal = document.getElementById("modal-desativar");
  modal.style.display = "none";

  const input = document.getElementById("confirmacaoTexto");
  const botao = document.getElementById("btnConfirmar");


  input.value = "";
  input.style.borderColor = "#ccc"; 
  botao.disabled = true;
}


document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("confirmacaoTexto");
  const botao = document.getElementById("btnConfirmar");

  input.addEventListener("input", () => {
    
    if (input.value === "QueroDesativarMinhaConta") {
      botao.disabled = false;
      input.style.borderColor = "#28a745";
    } else {
      botao.disabled = true;
      input.style.borderColor = "#dc3545"; 
    }
  });
});




// Modal de cropper

 let cropper;
const cropperModal = document.getElementById('cropperModal');
const cropperImage = document.getElementById('cropperImage');
const closeModal = document.querySelector('.close');
const confirmCrop = document.getElementById('confirmCrop');
const cancelCrop = document.getElementById('cancelCrop');
 
const bannerInput = document.getElementById('bannerInput');
const profileInput = document.getElementById('profileInput');
 
const bannerImage = document.getElementById('bannerImage');
const profileImage = document.getElementById('profileImage');
 
const editBanner = document.getElementById('editBanner');
const editProfile = document.getElementById('editProfile');
 
let currentType = '';
 
 
editBanner.addEventListener('click', () => {
    currentType = 'banner';
    bannerInput.click();
});
 
 
editProfile.addEventListener('click', () => {
    currentType = 'profile';
    profileInput.click();
});
 
 
[bannerInput, profileInput].forEach(input => {
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                cropperImage.src = reader.result;
                openModal();
            };
            reader.readAsDataURL(file);
        }
    });
});
 
 
function openModal() {
    cropperModal.style.display = 'flex';
 
    if (cropper) cropper.destroy();
 
    cropper = new Cropper(cropperImage, {
        aspectRatio: currentType === 'banner' ? 16 / 2 : 1,
        viewMode: 1,
        background: false,
        movable: true,
        zoomable: true,
        scalable: false,
        rotatable: false,
        dragMode: 'move',
        autoCropArea: 1
    });
}
 
 
function closeCropper() {
    cropper.destroy();
    cropper = null;
    cropperModal.style.display = 'none';
}
 
 
confirmCrop.addEventListener('click', () => {
    const canvas = cropper.getCroppedCanvas({
        width: currentType === 'banner' ? 1600 : 500,
        height: currentType === 'banner' ? 500 : 500,
        imageSmoothingQuality: 'high'
    });
 
    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
 
        if (currentType === 'banner') {
            bannerImage.src = url;
            const file = new File([blob], 'banner.png', { type: 'image/png' });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            bannerInput.files = dataTransfer.files;
        } else if (currentType === 'profile') {
            profileImage.src = url;
            const file = new File([blob], 'profile.png', { type: 'image/png' });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            profileInput.files = dataTransfer.files;
        }
        closeCropper();
    }, 'image/png');
});
 
 
cancelCrop.addEventListener('click', closeCropper);
closeModal.addEventListener('click', closeCropper);
 
 
window.addEventListener('click', (e) => {
    if (e.target === cropperModal) {
        closeCropper();
    }
});



// Exibição da especialização no select 

document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("especializacao");
    const outraEspecializacao = document.getElementById("outra-especializacao");
    const customInput = document.getElementById("customSpecialization");

    function handleSpecializationChange(value) {
      if (value === "Outro") {
        outraEspecializacao.style.display = "block";
      } else {
        outraEspecializacao.style.display = "none";
        customInput.value = "";
      }
    }


    select.addEventListener("change", function () {
      handleSpecializationChange(select.value);
    });

    handleSpecializationChange(select.value);
  });


  // para alternar entre as seções do configurações

  const menuItens = document.querySelectorAll('#ul-config li');
  const conteudos = document.querySelectorAll('.aba-conteudo');

  menuItens.forEach(item => {
    item.addEventListener('click', () => {
      // Remove 'active' de todos
      conteudos.forEach(conteudo => conteudo.classList.remove('active'));
      menuItens.forEach(i => i.classList.remove('ativo'));

      // Adiciona 'active' ao conteúdo certo
      const targetId = item.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
      item.classList.add('ativo');
    });
  });




  // Logout depois que muda tipo de conta

  setTimeout(() => {
      window.location.href = "/logout";
    }, 3000); // 3 segundos

    window.addEventListener('beforeunload', bloquearSaida);

function bloquearSaida(e) {
  e.preventDefault();
  e.returnValue = '';
}