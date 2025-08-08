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
 
 
  criarComentario: async (req, res) =>{
    try{
 
      console.log("Chegou no criarComentario");
      console.log('Body:', req.body);
 
      const erros = validationResult(req);
      if (!erros.isEmpty()) {
        console.log("Deu erro na validação af");
     
       
        const { idPublicacao } = req.body;
        const publicacao = await listagensModel.findIdPublicacao(idPublicacao);
     
        return res.render('pages/publicacao', {
          listaErros: erros,  
          dadosNotificacao: {
            titulo: 'Erro ao enviar comentário',
            mensagem: 'O comentário deve ter no mínimo 1 caractere e no máximo 2000',
            tipo: 'error'
          },
          publicacao
        });
      }
 
      const { conteudo, idPublicacao } = req.body;
      const idUsuario = req.session.autenticado.id;
 
     
 
      const resultado = await comentariosModel.criarComentario({
        ID_USUARIO: idUsuario,
        ID_PUBLICACAO: idPublicacao,
        CONTEUDO_COMENTARIO: conteudo,
        DATA_COMENTARIO: new Date()
      });
      console.log(resultado)
 
      if (!resultado){
        console.log("Deu erro na validação af");
     
       
        const { idPublicacao } = req.body;
        const publicacao = await listagensModel.findIdPublicacao(idPublicacao);
     
        return res.render('pages/publicacao', {
          listaErros: erros,  
          dadosNotificacao: {
            titulo: 'Erro ao enviar comentário.',
            mensagem: 'Não foi possível salvar seu comentário.',
            tipo: 'error'
          },
          publicacao
        });
      }
 
      const publicacao = await listagensModel.findIdPublicacao(idPublicacao);
 
      return res.render('pages/publicacao',{
        listaErros:null,
        dadosNotificacao:{
          titulo: 'Comentário enviado!',
          mensagem: "Seu comtário foi salvo",
          tipo: "success"
        },
        publicacao
      });
 
    } catch(erro){
      console.error("Erro ao criar comentario:", erro);
      return res.render('pages/publicacao',{
        listaErros: erro,
        dadosNotificacao:{
          titulo: 'feu erro',
          mensagem: "Seu comtário  n foi salvo",
          tipo: "error"
        },
        publicacao
      });
 
    }
  }
};
 
module.exports = comentariosController;