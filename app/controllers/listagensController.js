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
}







}


module.exports = listagensController;
           

