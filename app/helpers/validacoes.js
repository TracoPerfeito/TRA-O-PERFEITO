function verificadorCelular(celular) {
  //const celularp = celular.trim(); // limpa e deixa só número

  const celularp = celular.replace(/[^\d]+/g,'');
  
  // Pega o ddd e o resto 
  const ddd = celularp.substring(0, 2);
  const numero = celularp.substring(2);

  // Verifica se o DDD e o resto é válido
  if (/^[1-9][1-9]$/.test(ddd) && /^[9][0-9]{8}$/.test(numero)) {
      return true;
  }

  return false;


}



function validarCPF(cpf){
 
  cpf = cpf.replace(/[^\d]+/g,'');
  // Isso tira o que não for número

  if(cpf == '') return false;
  // Se não tiver nada, é inválido

  if (cpf.length != 11)
      return false;
  // Se não tiver 11 caracteres após tirar os ...sinais, é inválido.


  var somadoida;
  somadoida = 0;
  // Variáveis para a validação do cpf

  for(i=1; i<=9; i++ ) somadoida = somadoida + parseInt(cpf.substring(i-1, i)) * (11 -i);
  let digitoverificador1 = (somadoida * 10) % 11;
  // Aqui pegamos os 9 primeiros digitos e somamos eles com números de 10 a  (nessa ordem decrescente), cada um com um. Depois, vamos somar isso tudo, multiplicar por 10 e dividir por 11 e obter o resto, que vai ser usado para verifcar o digito lá

  if(digitoverificador1 == 10 || digitoverificador1 == 11){
      digitoverificador1 = 0;
      // se o resto for 10 ou 11, ele vale 0.
  }

  if(digitoverificador1 !== parseInt(cpf.charAt(9))){
      //Verificamos o primeiro digito verificador. O chatAt pega um dgito de acordo com o "caminho" especificado.
      // Se não bater, cpf inválido.
      return false;
  } else {
      somadoida = 0;
      // zeramos a soma doida.
      for(i=1; i<=10; i++ ) somadoida = somadoida + parseFloat(cpf.substring(i-1, i)) * (12 -i);
      // Fazemos tudo de novo, só que agora com o primeiro digito verificador e começando do numero 11 até o 2. Somamos e multiplicamos por 10.
      let digitoverificador2 = (somadoida * 10) % 11;
      // obtemos o resto da divisao por 11

      if(digitoverificador2 == 10 || digitoverificador2 == 11){
          digitoverificador2 = 0;
           // se o resto for 10 ou 11, ele vale 0.
      }

      if(digitoverificador2!== parseInt(cpf.charAt(10))){
          return false;
          // Verificamos o segundo digito verificador. Se não bater, é inválido.
      } return true;
  }


   

}

module.exports = { verificadorCelular, validarCPF };


