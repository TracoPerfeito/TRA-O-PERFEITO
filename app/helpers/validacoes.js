function verificadorCelular(celular) {
  const celularp = celular.trim(); // limpa e deixa só número

  // Pega o ddd e o resto 
  const ddd = celularp.substring(0, 2);
  const numero = celularp.substring(2);

  // Verifica se o DDD e o resto é válido
  if (/^[1-9][1-9]$/.test(ddd) && /^[9][0-9]{8}$/.test(numero)) {
      return true;
  }

  return false;


}

module.exports = { verificadorCelular };
