const publicacoesModel = require("../models/publicacoesModel");
const { body, validationResult } = require("express-validator");
const moment = require("moment");
const { removeImg } = require("../util/removeImg");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const https = require('https');
const fs = require('fs');



const publicacoesController = {

  regrasValidacaoCriarPublicacao: [
    body("titulo")
      .trim()
      .isLength({ min: 2, max: 70 })
      .withMessage("O título deve ter entre 2 e 70 caracteres."),
    body("categoria")
      .trim()
      .notEmpty()
      .withMessage("A categoria é obrigatória."),
    body("descricao")
      .trim()
      .isLength({ min: 2, max: 2000 })
      .withMessage("A descrição deve ter entre 2 e 2000 caracteres."),
    body("tags")
      .custom((value) => {
        try {
          const tags = JSON.parse(value);
          if (!Array.isArray(tags)) throw new Error();
          if (tags.length > 10) throw new Error("Máximo 10 tags permitidas.");
          return true;
        } catch {
          throw new Error("Tags inválidas, envie um array JSON.");
        }
      }),
    body("images")
      .custom((value, { req }) => {
        if (!req.files || !req.files.images || req.files.images.length === 0) {
          throw new Error("Pelo menos uma imagem deve ser enviada.");
        }
        if (req.files.images.length > 10) {
          throw new Error("Máximo 10 imagens permitidas.");
        }
        return true;
      })
  ],

  criarPublicacao: async (req, res) => {

    try {

      // Avisa que chegou aqui e mostra os valores recebidos.
      console.log("Chegou no criarPublicacao.");
      console.log("Body:", req.body);
      console.log("FILES:", req.files);


      //Verifica se a validação retornou algum erro.
      const erros = validationResult(req);
      if (!erros.isEmpty()) {
        console.log("Deu erro na validação af");
        return res.status(400).json({ erros: erros.array() });
      
      }

      // titulo, descricao, categoria e tags são retirados do body.
      const { titulo, descricao, categoria, tags } = req.body;
      // Pega o ID do usuário logado.
      const idUsuario = req.session.autenticado.id;

      // Cria a publicação com seus dados base, na tabela PUBLICACOES_PROFISSIONAL.
      const resultado = await publicacoesModel.criarPublicacao({
        ID_USUARIO: idUsuario,
        NOME_PUBLICACAO: titulo,
        DESCRICAO_PUBLICACAO: descricao,
        CATEGORIA: categoria
      });

      console.log(resultado) // Mostra o que foi inserido na tabela PUBLICACOES_PROFISSIONAL.

      // Se não houver resultado, ou seja, nada foi inserido, retorna um erro. 
      if (!resultado) {
        return res.status(500).json({ erro: "Erro ao criar a publicação." });
      }

        
      const idPublicacao = resultado; // resultado já é o insertId
      console.log("Id inserido:", idPublicacao); // Mostra o ID da publicação inserida.
      const imagens = req.files.images || req.files || [];
      console.log("Imagens recebidas:", imagens);

    if (imagens && imagens.length > 0) { //Se tem imagens e o tamanho é maior que 0...
      for (const imagem of imagens) { // Para cada imagem recebida...
        const bufferImagem = imagem.buffer; // Converte a imagem para buffer (dados binários).
        
        await publicacoesModel.inserirConteudo(idPublicacao, bufferImagem); // Insere a imagem na tabela CONTEUDO_PUBLICACOES_PROFISSIONAL, com o ID da publicação que foi inserido anteriormente em PUBLICACOES_PROFISSIONAL.
        console.log("Imagem inserida com sucesso"); // Para avisar que inseriu a imagem com sucesso
      }
    }


 const tagsRecebidas = JSON.parse(req.body.tags); // Monta um const com as tags que vieram do body
 console.log("Tags recebidas:", tagsRecebidas); //Mostra pra nois no terminal

 for (const tag of tagsRecebidas) { //agora vamos fazer certas instruções para cada uma das tags do array
  console.log("Tag:", tag); //Mostra no terminal a tag do momento

  let tagExistente = await publicacoesModel.buscarTagPorNome(tag);  // Confere no banco se já tem uma tag com esse nome. Se não tiver, fica undefined.
  console.log("Tag encontrada no buscarTagPorNome:", tagExistente);// Mostra o retorno


  if(!tagExistente){// Se a tag ainda não existe
    const novaTag = await publicacoesModel.criarTag(tag); //Define novaTag como o resultado da criação de uma nova tag com o nome
    console.log("Tag criada:", novaTag); // Mostra a tag que foi criada

    let tagPublicacao = novaTag; //Agora define tagPublicacao como a novaTag que acabou de ser criada
    console.log(tagPublicacao); //Mostra qual é a tagPublicação

    const resultado = await publicacoesModel.associarTagPublicacao(tagPublicacao, idPublicacao); //Insere uma linha na tabela de relacionamento: o id da tag e o id da publicação
    console.log(resultado) //Resultado da tentativa de associar tags a publicação

  } else {// Se a tag já existe
    console.log("Tag já existe:", tagExistente); // Mostra que ela já existe
     
    let tagPublicacao = tagExistente.ID_TAG; //Define tagPublicação como o ID da tag já existente

    console.log(tagPublicacao); //Mostra o id da tag

    const resultado = await publicacoesModel.associarTagPublicacao(tagPublicacao, idPublicacao);//Insere uma linha na tabela de relacionamento: o id da tag e o id da publicação
    console.log(resultado) //Resultado da tentativa de associar tags a publicação




  }
}



      return res.status(200).json({ mensagem: "Publicação criada com sucesso!" });

    } catch (erro) {
      console.error("Erro ao criar publicação:", erro);
      return res.status(500).json({ erro: "Erro interno ao criar publicação." });
    }
  }



  
};

module.exports = publicacoesController;