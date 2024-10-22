
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

