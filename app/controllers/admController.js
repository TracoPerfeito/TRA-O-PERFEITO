const usuariosModel = require("../models/usuariosModel");
const { body, validationResult } = require("express-validator");
const moment = require("moment");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const { verificadorCelular, validarCPF } = require("../helpers/validacoes");

const admController = {

regrasValidacaoLogin: [
        body("email")
            .isEmail()
            .withMessage("Insira um email válido"),
        body("password")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)")
    ],





 logar: (req, res) => {
    const autenticado = req.session.autenticado;

    if (autenticado && autenticado.autenticado !== null) {
   
        if (autenticado.tipo === "administrador") {
            console.log("🔄 Redirecionando para o painel do Administrador.");
            return res.redirect("/adm/");
        } else {
            console.log("⚠️ Tipo de usuário desconhecido.");
            return res.redirect("/");
        }
        
    } else {
        console.log("❌ Usuário não autenticado. Erro no login.");
        return res.render("pages/login", {
            valores: req.body,
            errosLogin: [],
            retorno: "E-mail ou senha inválidos."
        });
    }
}

   




}


module.exports = admController;
           

