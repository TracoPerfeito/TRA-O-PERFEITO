
let currentStep = 0;
let accountType = null; // 'comum' or 'artista'


const formSteps = document.querySelectorAll(".form-step");

function showStep(step) {
  formSteps.forEach((stepDiv, index) => {
    stepDiv.classList.toggle("active", index === step);
  });

  currentStep = step;
  buttonSituation();
  preenchimentoBarraProgresso()
  funcaoBtnPagamento();

  
  analisarEtapaSenha();



}










function selectAccountType(tipo) {
   document.getElementById('tipo_conta').value = tipo;


    document.getElementById('card-comum').classList.remove('selected');
    document.getElementById('card-artista').classList.remove('selected');

    if (tipo === 'comum') {
      document.getElementById('card-comum').classList.add('selected');
    } else {
      document.getElementById('card-artista').classList.add('selected');
    }
    nextStep();
  }
  















  function nextStep() {
 
    if (currentStep === 3) {
      buttonSituation();
      document.getElementById("signupForm").submit();
      return;
    } else {



    showStep(currentStep + 1);

  }

  }













  function prevStep() {

    if (currentStep > 0) {
      showStep(currentStep - 1);
    }

  
  }























  

  

  function preenchimentoBarraProgresso() {

    const progressBar = document.getElementById("progressBar"); 

    let totalSteps = 5;

    
    const progress = ((currentStep) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${progress}%`;
  }






  



   

  function buttonSituation() {

    if(currentStep === 4 ){

        let senhaBtn = document.getElementById("senhaBtn");
        senhaBtn.textContent = "Finalizar Cadastro";
        senhaBtn.onclick = () => document.getElementById("signupForm").submit();
    }

  }

  // FUNÇÕES VERIFICADORAS DE CELULAR E CPF 

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



async function verificarDuplicidade(campo, valor) {
  if (!valor) return false; // Se vazio, não faz sentido verificar

  try {
    const response = await fetch(`/verificar?campo=${campo}&valor=${encodeURIComponent(valor)}`);
    const data = await response.json();
    return data.existe; // true se já existir, false se não
  } catch (error) {
    console.error("Erro na verificação:", error);
    return false;
  }
}









async function analisarEtapaDadosBasicos() {
  const campos = {
    nome: document.querySelector('input[name="nome"]'),
    usuario: document.querySelector('input[name="usuario"]'),
    cpf: document.querySelector('input[name="cpf"]'),
    email: document.querySelector('input[name="email"]'),
    celular: document.querySelector('input[name="celular"]')
  };

 
  const spansErro = {
    nome: document.querySelector('span.msg-erro[for="nome"]'),
    usuario: document.querySelector('span.msg-erro[for="usuario"]'),
    cpf: document.querySelector('span.msg-erro[for="cpf"]'),
    email: document.querySelector('span.msg-erro[for="email"]'),
    celular: document.querySelector('span.msg-erro[for="celular"]')
  };

  // Limpa erros anteriores e remove classes de erro
  Object.values(spansErro).forEach(span => { if(span) span.textContent = ''; });
  Object.values(campos).forEach(input => input.classList.remove('input-erro'));

  let valido = true; // flag para controlar se o formulário está válido

  // Faz as verificações assíncronas (duplicidade)
  const [emailExiste, usuarioExiste, cpfExiste, celularExiste] = await Promise.all([
    verificarDuplicidade("email", campos.email.value.trim()),
    verificarDuplicidade("username", campos.usuario.value.trim()),
    verificarDuplicidade("cpf", campos.cpf.value.trim()),
    verificarDuplicidade("celular", campos.celular.value.trim())
  ]);

  // Validação do campo nome
  const nome = campos.nome.value.trim();
  if (nome.length < 3 || nome.length > 50) {
    spansErro.nome.textContent = 'O nome deve ter de 3 a 50 caracteres.';
    campos.nome.classList.add('input-erro');
    valido = false;
  } else if (/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/.test(nome)) {
    spansErro.nome.textContent = 'O nome deve conter apenas letras.';
    campos.nome.classList.add('input-erro');
    valido = false;
  }

  // Validação do usuário
  const usuario = campos.usuario.value.trim();
  if (usuario.length < 6 || usuario.length > 20) {
    spansErro.usuario.textContent = 'O usuário deve ter de 6 a 20 caracteres.';
    campos.usuario.classList.add('input-erro');
    valido = false;
  }  else if (!/^[a-zA-Z0-9._]+$/.test(usuario)) {
  spansErro.usuario.textContent = 'O usuário só pode conter letras, números, pontos e underlines.';
  campos.usuario.classList.add('input-erro');
  valido = false;
} else if (usuarioExiste) {
    spansErro.usuario.textContent = 'Este usuário já está em uso.';
    campos.usuario.classList.add('input-erro');
    valido = false;
  }

  // Validação do CPF (assumindo que validarCPF é função que retorna true/false)
  const cpfValor = campos.cpf.value.trim();
  if (typeof validarCPF !== 'function' || !validarCPF(cpfValor)) {
    spansErro.cpf.textContent = 'CPF inválido.';
    campos.cpf.classList.add('input-erro');
    valido = false;
  } else if (cpfExiste) {
    spansErro.cpf.textContent = 'Este CPF já está cadastrado.';
    campos.cpf.classList.add('input-erro');
    valido = false;
  }

  // Validação do e-mail
  const emailValor = campos.email.value.trim();
  const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]{0,62}[a-zA-Z0-9])?@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(emailValor)) {
    spansErro.email.textContent = 'E-mail inválido.';
    campos.email.classList.add('input-erro');
    valido = false;
  } else if (emailExiste) {
    spansErro.email.textContent = 'Este e-mail já está cadastrado.';
    campos.email.classList.add('input-erro');
    valido = false;
  }

  // Validação do celular (assumindo verificadorCelular é função que retorna true/false)
  const celularValor = campos.celular.value.trim();
  if (typeof verificadorCelular !== 'function' || !verificadorCelular(celularValor)) {
    spansErro.celular.textContent = 'Número de celular inválido.';
    campos.celular.classList.add('input-erro');
    valido = false;
  } else if (celularExiste) {
    spansErro.celular.textContent = 'Este celular já está cadastrado.';
    campos.celular.classList.add('input-erro');
    valido = false;
  }

  if (valido) {
    nextStep(); // se tudo válido, chama a função para avançar a etapa
  }

}






// Função para verificar password
function validarPassword(password) {
  const minLength = 8;
  const temMaiuscula = /[A-Z]/.test(password);
  const temMinuscula = /[a-z]/.test(password);
  const temNumero = /[0-9]/.test(password);
  const temSimbolo = /[^A-Za-z0-9]/.test(password);

  return (
    password.length >= minLength &&
    temMaiuscula &&
    temMinuscula &&
    temNumero &&
    temSimbolo
  );
}









function analisarEtapaSenha() {

   const campos = {
    password: document.querySelector('input[name="password"]'),
    confirmpassword: document.querySelector('input[name="confirmpassword"]')
   
  };
  const spansErro = {
    password: document.querySelector('span.msg-erro[for="password"]'),
    confirmpassword: document.querySelector('span.msg-erro[for="confirmpassword"]') 
  };



  let valido = true;

   // Limpa erros anteriores
  Object.values(spansErro).forEach(span => {
    if (span) span.textContent = '';
  });
  Object.values(campos).forEach(input => input.classList.remove('input-erro'));



  const password = campos.password.value.trim();
  if (password === '' || !validarPassword(password)) {
    spansErro.password.textContent = 'Crie uma senha forte';
    campos.password.classList.add('input-erro');
    valido = false;
  } 

  const confirmpassword = campos.confirmpassword.value.trim();
  if (confirmpassword !== password){
    spansErro.confirmpassword.textContent = 'As senhas não coincidem!';
    campos.confirmpassword.classList.add('input-erro');
    valido = false;
  } 


    if (valido) {
    nextStep();
  }

}















function analisarEtapaData() {
  const campos = {
    dataNasc: document.querySelector('input[type="date"]'),
    genero: document.querySelector('select.genero')
  };
  const spansErro = {
    dataNasc: document.querySelector('span.msg-erro[for="dataNasc"]'),
    genero: document.querySelector('span.msg-erro[for="genero"]')
  };

  let valido = true;

  // Limpa erros anteriores
  Object.values(spansErro).forEach(span => {
    if (span) span.textContent = '';
  });
  Object.values(campos).forEach(input => input.classList.remove('input-erro'));

  const dataNasc = campos.dataNasc.value;
  const hoje = new Date();
  const nascimento = new Date(dataNasc);

  if (dataNasc === '') {
    spansErro.dataNasc.textContent = 'Insira sua data de nascimento!';
    campos.dataNasc.classList.add('input-erro');
    valido = false;
  } else if (isNaN(nascimento.getTime()) || nascimento > hoje) {
    spansErro.dataNasc.textContent = 'Insira uma data de nascimento válida!';
    campos.dataNasc.classList.add('input-erro');
    valido = false;
  } else {
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    if (idade < 18) {
      spansErro.dataNasc.textContent = 'Você precisa ter no mínimo 18 anos!';
      campos.dataNasc.classList.add('input-erro');
      valido = false;
    } else if (idade > 100) {
      spansErro.dataNasc.textContent = 'Insira uma idade válida (máximo 100 anos)!';
      campos.dataNasc.classList.add('input-erro');
      valido = false;
    }
  }

  const genero = campos.genero.value;
  if (genero === '') {
    spansErro.genero.textContent = 'Insira seu gênero!';
    campos.genero.classList.add('input-erro');
    valido = false;
  }

  if (valido) {
    nextStep();
  }
}








  // validação senha


  
    function validarSenha() {
      const senha = document.getElementById('senha').value;

      const validacoes = {
        maiuscula: /[A-Z]/.test(senha),
        minuscula: /[a-z]/.test(senha),
        numero: /\d/.test(senha),
        especial: /[\W_]/.test(senha),
        unicos: new Set(senha).size >= 3,
        tamanho: senha.length >= 8
      };

      atualizarItem("val-maiuscula", validacoes.maiuscula);
      atualizarItem("val-minuscula", validacoes.minuscula);
      atualizarItem("val-numero", validacoes.numero);
      atualizarItem("val-especial", validacoes.especial);
      atualizarItem("val-unicos", validacoes.unicos);
      atualizarItem("val-tamanho", validacoes.tamanho);
    }

    function atualizarItem(id, valido) {
      const item = document.getElementById(id);
      item.classList.remove("valido", "invalido");
      item.classList.add(valido ? "valido" : "invalido");
    }

    function mostrarValidacoes() {
      document.getElementById("box-validacoes").classList.add("ativa");
    }

    function ocultarValidacoes() {
      const senha = document.getElementById('senha').value;
      if (!senha) {
        document.getElementById("box-validacoes").classList.remove("ativa");
      }
    }