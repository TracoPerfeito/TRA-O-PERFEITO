
document.getElementById("icon-config").addEventListener("click", function() {
    const configSection = document.querySelector(".config-section");
    configSection.classList.toggle("open");
});

// Fechar a seção de configurações quando o botão de alternar tema for clicado
// document.getElementById("theme-switch").addEventListener("click", function() {
//     const configSection = document.querySelector(".config-section");
//     configSection.classList.remove("open"); // Fecha a seção
// });


document.getElementById("menu-btn").addEventListener("change", function() {
    if (!this.checked) {
        const configSection = document.querySelector(".config-section");
        configSection.classList.remove("open"); 
    }
});



  function toggleUserMenu() {
    if(window.innerWidth > 1230){

    const menu = document.getElementById("userMenu");
    menu.classList.toggle("open");
    if (menu.classList.contains("open")) {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  }
}

document.addEventListener('click', () => {
  const menu = document.getElementById("userMenu");
  if (menu.classList.contains('open')) {
    menu.classList.remove('open');
  }
});

 

function toggleSection(sectionId, arrowId) {
  const section = document.getElementById(sectionId);
  const arrow = document.getElementById(arrowId);

  if (section.classList.contains('active')) {
    section.classList.remove('active'); // Esconde a seção
    arrow.classList.remove('arrow-up');
    arrow.classList.add('arrow-down'); // Mostra seta para baixo
  } else {
    section.classList.add('active'); // Mostra a seção
    arrow.classList.remove('arrow-down');
    arrow.classList.add('arrow-up'); // Mostra seta para cima
  }
}

