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

    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }

    const especializacao = await listagensModel.findEspecializacaoByUserId(id);

    res.render('pages/perfil', {
      usuario,
      especializacao
    });
  } catch (erro) {
    console.log(erro);
    res.status(500).send('Erro ao carregar perfil');
  }
}







}


module.exports = listagensController;
           

