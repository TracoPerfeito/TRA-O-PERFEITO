const comentariosModel = require("../models/comentariosModel");
const listagensModel = require("../models/listagensModel");
const { body, validationResult } = require("express-validator");
const moment = require("moment");
 
 
 
const comentariosController = {
 
  regrasValidacaoComentario:[
    body('conteudo')
    .trim()
    .isLength({min: 1, max: 2000})
    .withMessage('O comentário deve ter no mínimo 1 caractere e no máximo 2000')
  ],
 
 
 criarComentario: async (req, res) => {
  try {
    console.log("Chegou no criarComentario");
    console.log('Body:', req.body);

    const erros = validationResult(req);
    const { conteudo, idPublicacao } = req.body;

    if (!erros.isEmpty()) {
      console.log("Deu erro na validação af");

      const publicacao = await listagensModel.findIdPublicacao(idPublicacao);
      const comentarios = await comentariosModel.listarComentarios(idPublicacao);

      return res.render('pages/publicacao', {
        listaErros: erros,
        dadosNotificacao: {
          titulo: 'Erro ao enviar comentário',
          mensagem: 'O comentário deve ter no mínimo 1 caractere e no máximo 2000',
          tipo: 'error'
        },
        publicacao,
        comentarios,
        usuario: req.session.autenticado || null,
        autenticado: !!req.session.autenticado,
      });
    }

    const idUsuario = req.session.autenticado.id;

    const resultado = await comentariosModel.criarComentario({
      ID_USUARIO: idUsuario,
      ID_PUBLICACAO: idPublicacao,
      CONTEUDO_COMENTARIO: conteudo,
      DATA_COMENTARIO: new Date()
    });
    console.log(resultado);

    if (!resultado) {
      console.log("Deu erro ao salvar comentário");

      const publicacao = await listagensModel.findIdPublicacao(idPublicacao);
      const comentarios = await comentariosModel.listarComentarios(idPublicacao);

      return res.render('pages/publicacao', {
        listaErros: null,
        dadosNotificacao: {
          titulo: 'Erro ao enviar comentário.',
          mensagem: 'Não foi possível salvar seu comentário.',
          tipo: 'error'
        },
        publicacao,
        comentarios,
        usuario: req.session.autenticado || null,
        autenticado: !!req.session.autenticado,
      });
    }

    const publicacao = await listagensModel.findIdPublicacao(idPublicacao);
    const comentarios = await comentariosModel.listarComentarios(idPublicacao);

    return res.render('pages/publicacao', {
      listaErros: null,
      dadosNotificacao: {
        titulo: 'Comentário enviado!',
        mensagem: "Seu comentário foi salvo",
        tipo: "success"
      },
      publicacao,
      comentarios,
      usuario: req.session.autenticado || null,
      autenticado: !!req.session.autenticado,
    });

  } catch (erro) {
    console.error("Erro ao criar comentario:", erro);

    // Tente buscar publicacao e comentarios para a renderização mesmo em caso de erro
    let publicacao = null;
    let comentarios = [];

    try {
      const { idPublicacao } = req.body;
      publicacao = await listagensModel.findIdPublicacao(idPublicacao);
      comentarios = await comentariosModel.listarComentarios(idPublicacao);
    } catch (e) {
      console.error("Erro ao buscar publicação/comentários no catch:", e);
    }

    return res.render('pages/publicacao', {
      listaErros: erro,
      dadosNotificacao: {
        titulo: 'Erro',
        mensagem: "Seu comentário não foi salvo",
        tipo: "error"
      },
      publicacao,
      comentarios,
      usuario: req.session.autenticado || null,
      autenticado: !!req.session.autenticado,
    });
  }
},
excluirComentario: async (req, res) => {
  try {
    console.log("Chegou no excluirComentario");
    console.log('Body:', req.body);

    const { idComentario, idPublicacao } = req.body; // idPublicacao precisa ser extraído aqui
    const idUsuario = req.session.autenticado.id;

    const dadosForm = { idComentario, idUsuario };
    console.log("olja aqui", dadosForm.idComentario)
    const resultado = await comentariosModel.excluirComentario(dadosForm.idComentario);

    console.log(resultado);

    if (!resultado) {
      console.log("Deu erro ao excluir comentário");

      const publicacao = await listagensModel.findIdPublicacao(idPublicacao);
      const comentarios = await comentariosModel.listarComentarios(idPublicacao);

      return res.render('pages/publicacao', {
        listaErros: null,
        dadosNotificacao: {
          titulo: 'Erro ao excluir comentário.',
          mensagem: 'Não foi possível excluir o comentário.',
          tipo: 'error'
        },
        publicacao,
        comentarios,
        usuario: req.session.autenticado || null,
        autenticado: !!req.session.autenticado,
      });
    }

    const publicacao = await listagensModel.findIdPublicacao(idPublicacao);
    const comentarios = await comentariosModel.listarComentarios(idPublicacao);

    return res.render('pages/publicacao', {
      listaErros: null,
      dadosNotificacao: {
        titulo: 'Comentário excluído.',
        mensagem: "O comentário foi excluído.",
        tipo: "success"
      },
      publicacao,
      comentarios,
      usuario: req.session.autenticado || null,
      autenticado: !!req.session.autenticado,
    });

  } catch (erro) {
    console.error("Erro ao excluir comentário:", erro);

    let publicacao = null;
    let comentarios = [];

    try {
      const { idPublicacao } = req.body;
      publicacao = await listagensModel.findIdPublicacao(idPublicacao);
      comentarios = await comentariosModel.listarComentarios(idPublicacao);
    } catch (e) {
      console.error("Erro ao buscar publicação/comentários no catch:", e);
    }

    return res.render('pages/publicacao', {
      listaErros: erro,
      dadosNotificacao: {
        titulo: 'Erro',
        mensagem: "Não foi possível excluir o comentário.",
        tipo: "error"
      },
      publicacao,
      comentarios,
      usuario: req.session.autenticado || null,
      autenticado: !!req.session.autenticado,
    });
  }
}



};
 
module.exports = comentariosController;