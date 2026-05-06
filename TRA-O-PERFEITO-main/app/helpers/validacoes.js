function verificadorCelular(celular) {
  if (!celular) return false;

  const celularp = celular.toString().replace(/[^\d]+/g, '');
  if (!/^[0-9]{11}$/.test(celularp)) return false;

  const ddd = celularp.substring(0, 2);
  const numero = celularp.substring(2);

  if (!/^[1-9][1-9]$/.test(ddd)) return false;
  if (!/^9[0-9]{8}$/.test(numero)) return false;

  return true;
}

function validarCPF(cpf) {
  if (!cpf) return false;

  const cpfLimpo = cpf.toString().replace(/[^\d]+/g, '');
  if (!/^[0-9]{11}$/.test(cpfLimpo)) return false;
  if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i), 10) * (10 - i);
  }

  let digito1 = (soma * 10) % 11;
  if (digito1 === 10) digito1 = 0;
  if (digito1 !== parseInt(cpfLimpo.charAt(9), 10)) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i), 10) * (11 - i);
  }

  let digito2 = (soma * 10) % 11;
  if (digito2 === 10) digito2 = 0;

  return digito2 === parseInt(cpfLimpo.charAt(10), 10);
}

module.exports = { verificadorCelular, validarCPF };
