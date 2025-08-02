const listagensModel = require("../models/listagensModel");
const { body, validationResult } = require("express-validator");
const moment = require("moment");


const listagensController = {


    listarProfissionais: async (req, res) => {
  try {
    const profissionais = await listagensModel.buscarProfissionaisComEspecializacao();

    console.log("Profissionais encontrados:", profissionais);
    res.render('pages/contratar', {
      profissionais
    });

  } catch (error) {
    console.error("Erro no controller ao listar profissionais:", error);
    res.status(500).send("Erro interno ao buscar profissionais");
  }
},


  exibirPerfil: async (req, res) => {
  const id = req.params.id;
  try {
    const usuario = await listagensModel.findId(id);
    const publicacoes = await listagensModel.listarPublicacoesPorUsuario(id);

    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }

    const especializacao = await listagensModel.findEspecializacaoByUserId(id);

    

    console.log("Dados do perfil sendo exibido:", usuario, especializacao, publicacoes);
    res.render('pages/perfil', {
      usuario,
      especializacao,
      publicacoes
    });
  } catch (erro) {
    console.log(erro);
    res.status(500).send('Erro ao carregar perfil');
  }
},


    listarPublicacoes: async (req, res,  dadosNotificacao) => {
  try {
    const publicacoes = await listagensModel.listarPublicacoes();

    console.log("Publicações encontradas:", publicacoes);

    
    res.render('pages/index', {
      publicacoes,
      autenticado: req.session.autenticado,
        logado: req.session.logado,
        listaErros:null,
       dadosNotificacao
    });

  } catch (error) {
    console.error("Erro no controller ao listar publicações:", error);
    res.status(500).send("Erro interno ao buscar publicações");
     res.render('pages/index', {
      autenticado: req.session.autenticado,
      logado: req.session.logado,
      listaErros: ['Erro ao carregar publicações'],
      dadosNotificacao,
      publicacoes: []
    });
  }
},


  exibirPublicacao: async (req, res) => {
  const id = req.params.id;
  try {
    const publicacao = await listagensModel.findIdPublicacao(id);

    if (!publicacao) {
      return res.status(404).send('Publicação não encontrada');
    }

    console.log("Dados da publicação sendo exibida:", publicacao);
    res.render('pages/publicacao', {
      publicacao
    });
  } catch (erro) {
    console.log(erro);
    res.status(500).send('Erro ao carregar publicação');
  }
},


 







}


module.exports = listagensController;
           

