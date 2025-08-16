const fs = require('fs');
const path = require('path');

const caminho = path.join(__dirname, './app/public/imagens/logo.png'); // ajuste o caminho se necessário
const imagem = fs.readFileSync(caminho);
const base64 = imagem.toString('base64');

// Pronto para usar no HTML
const imgBase64 = `data:image/png;base64,${base64}`;
console.log(imgBase64);
