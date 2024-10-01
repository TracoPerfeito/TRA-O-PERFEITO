// const imagem = document.getElementById('img-principal');
// const contExpandido = document.getElementById('con-img-expandida');
// const imagemExpandida = document.getElementById('imgExpandida');
// const fechar = document.getElementById('fechar');

 

// imagem.onclick = function() {
//     contExpandido.style.display = "block";
//     imagemExpandida.src = this.src; 
// }
 
// expandirIcon.onclick = function() {
//     contExpandido.style.display = "block";
//     imagemExpandida.src = imagem.src;
// }
 
// fechar.onclick = function() {
//     contExpandido.style.display = "none";
// }

// contExpandido.onclick = function(event) {
//     if (event.target === contExpandido) {
//         contExpandido.style.display = "none";
//     }
// }





const imagem = document.getElementById('img-principal');
const contExpandido = document.getElementById('con-img-expandida');
const imagemExpandida = document.getElementById('imgExpandida');
const fechar = document.getElementById('fechar');

// Nível inicial de zoom
let zoomLevel = 1;

// Expande a imagem ao clicar
imagem.onclick = function() {
    contExpandido.classList.add("show");
    imagemExpandida.src = this.src; 
    zoomLevel = 1;
    imagemExpandida.style.transform = `scale(${zoomLevel})`;
    imagemExpandida.style.transformOrigin = "center center"; // Reseta a origem do zoom ao centro
}

// Fecha a imagem expandida ao clicar no "X"
fechar.onclick = function() {
    contExpandido.classList.remove("show");
    zoomLevel = 1;
    imagemExpandida.style.transform = `scale(${zoomLevel})`;
}

// Fecha a imagem expandida ao clicar fora dela
contExpandido.onclick = function(event) {
    if (event.target === contExpandido) {
        contExpandido.classList.remove("show");
        zoomLevel = 1;
        imagemExpandida.style.transform = `scale(${zoomLevel})`;
    }
}

// Evento para o zoom ao passar o mouse na imagem expandida
imagemExpandida.onmousemove = function(event) {
    if (zoomLevel > 1) {
        const rect = imagemExpandida.getBoundingClientRect(); // Pega o tamanho da imagem
        const x = ((event.clientX - rect.left) / rect.width) * 100; // Calcula a posição X do mouse
        const y = ((event.clientY - rect.top) / rect.height) * 100; // Calcula a posição Y do mouse

        // Limita a movimentação da origem do zoom para evitar que a imagem se mexa demais
        const limitX = Math.max(0, Math.min(100, x));
        const limitY = Math.max(0, Math.min(100, y));

        imagemExpandida.style.transformOrigin = `${limitX}% ${limitY}%`; // Ajusta a origem do zoom baseado no mouse
    }
}

// Clique na imagem para alternar entre zoom in/zoom out
imagemExpandida.onclick = function() {
    if (zoomLevel === 1) {
        zoomLevel = 2; // Zoom de 2x no clique
        imagemExpandida.style.cursor = "zoom-out";
    } else {
        zoomLevel = 1; // Volta ao zoom normal no segundo clique
        imagemExpandida.style.cursor = "zoom-in";
    }
    imagemExpandida.style.transform = `scale(${zoomLevel})`;
}
