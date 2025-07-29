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




const contExpandido = document.getElementById('con-img-expandida');
const imagemExpandida = document.getElementById('imgExpandida');
const fechar = document.getElementById('fechar');

let zoomLevel = 1;

document.querySelectorAll('.publicacao-img').forEach(imagem => {
  imagem.style.cursor = 'zoom-in';  // opcional, cursor bonito

  imagem.onclick = function() {
    contExpandido.classList.add("show");
    imagemExpandida.src = this.src; 
    zoomLevel = 1;
    imagemExpandida.style.transform = `scale(${zoomLevel})`;
    imagemExpandida.style.transformOrigin = "center center";
    imagemExpandida.style.cursor = 'zoom-in';
  };
});

fechar.onclick = function() {
  contExpandido.classList.remove("show");
  zoomLevel = 1;
  imagemExpandida.style.transform = `scale(${zoomLevel})`;
};

contExpandido.onclick = function(event) {
  if (event.target === contExpandido) {
    contExpandido.classList.remove("show");
    zoomLevel = 1;
    imagemExpandida.style.transform = `scale(${zoomLevel})`;
  }
};

imagemExpandida.onmousemove = function(event) {
  if (zoomLevel > 1) {
    const rect = imagemExpandida.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const limitX = Math.max(0, Math.min(100, x));
    const limitY = Math.max(0, Math.min(100, y));

    imagemExpandida.style.transformOrigin = `${limitX}% ${limitY}%`;
  }
};

imagemExpandida.onclick = function() {
  if (zoomLevel === 1) {
    zoomLevel = 2;
    imagemExpandida.style.cursor = "zoom-out";
  } else {
    zoomLevel = 1;
    imagemExpandida.style.cursor = "zoom-in";
  }
  imagemExpandida.style.transform = `scale(${zoomLevel})`;
};


let currentIndex = 0;
const imagens = Array.from(document.querySelectorAll('.publicacao-img'));

imagens.forEach((img, idx) => {
  img.onclick = function() {
    currentIndex = idx;
    openExpandedImage(this.src);
  };
});

function openExpandedImage(src) {
  contExpandido.classList.add("show");
  imagemExpandida.src = src;
  zoomLevel = 1;
  imagemExpandida.style.transform = `scale(${zoomLevel})`;
  imagemExpandida.style.transformOrigin = "center center";
  imagemExpandida.style.cursor = 'zoom-in';
}

document.getElementById('prevArrow').onclick = function() {
  currentIndex = (currentIndex - 1 + imagens.length) % imagens.length;
  openExpandedImage(imagens[currentIndex].src);
};

document.getElementById('nextArrow').onclick = function() {
  currentIndex = (currentIndex + 1) % imagens.length;
  openExpandedImage(imagens[currentIndex].src);
};
