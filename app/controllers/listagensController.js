const listagensModel = require("../models/listagensModel");
const comentariosModel = require("../models/comentariosModel");
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
 
    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }
 
    const especializacao = await listagensModel.findEspecializacaoByUserId(id);
 
    console.log("Ddados do perfil sendo exibido:", usuario, especializacao);
    res.render('pages/perfil', {
      usuario,
      especializacao
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
 
    let usuario = null;
    if (req.session.autenticado && typeof req.session.autenticado === 'object' && req.session.autenticado.ID_USUARIO) {
      usuario = req.session.autenticado;
    } else if (req.session.autenticado && typeof req.session.autenticado === 'object') {
      // Se autenticado for um objeto mas sem ID_USUARIO, tenta pegar o campo id
      usuario = await listagensModel.findId(req.session.autenticado.id || req.session.autenticado.ID || req.session.autenticado);
    } else if (req.session.autenticado) {
      // Se autenticado for apenas o ID
      usuario = await listagensModel.findId(req.session.autenticado);
    }
 
    // Só bloqueia se o usuário estiver autenticado mas não for encontrado no banco
    // Se não encontrar o usuário autenticado, apenas trata como visitante
    // Se não estiver autenticado, apenas mostra a publicação normalmente
 
    const comentarios = await comentariosModel.listarComentarios(id);
 
    console.log("Dados da publicação sendo exibida:", publicacao);
    console.log("Usuário autenticado passado para a view:", usuario);
    res.render('pages/publicacao', {
      publicacao,
      comentarios,
      listaErros: null,
      usuario: usuario || null,
      autenticado: !!usuario, // true se logado, false se não
      dadosNotificacao: null,
     
 
    });
  } catch (erro) {
    console.log(erro);
    res.status(500).send('Erro ao carregar publicação');
  }
},
 
 
 
 
 
 
}
 
 
module.exports = listagensController;