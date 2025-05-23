const usuariosModel = require("../models/usuariosModel");
const { body, validationResult } = require("express-validator");
const moment = require("moment");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const { verificadorCelular, validarCPF } = require("../helpers/validacoes");

const usuariosController = {

    regrasValidacaoCadastro: [


body("nome").isLength({ min: 3, max: 50 }).withMessage('O nome deve ter de 3 a 50 caracteres.')
      .custom(nome => {
        if (/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/.test(nome)) {
            throw new Error('O nome deve conter apenas letras.');
        }
        return true; 
      }),
    body("usuario").isLength({ min: 6, max: 20 }).withMessage('O usuario deve ter de 6 a 20 caracteres.'),

    body("email").isEmail().withMessage('Insira um e-mail válido.'),

    body('celular').isLength({ min: 10, max: 14 } ).withMessage('Número de celular inválido.')

       .custom(celular => verificadorCelular(celular)).withMessage('Número de celular inválido.'),

    body('cpf').isLength({ min: 11, max: 14 }).withMessage('CPF inválido.')

    .custom((cpf) => {
        if (validarCPF(cpf)) {
          return true;
        } else {
          throw new Error('CPF inválido.');
        }
    }),

    body('password').isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres.'),
    body('confirmpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('As senhas não coincidem.');
        }
        return true;
    })

    // function (req, res) {

    //     const listaErros = validationResult(req);

    //     if (listaErros.isEmpty()) {

    //         return res.redirect("/explorar-logado");

    //     } else {
        
    //         console.log(listaErros);
    //         return res.render("pages/teste-cadastro", { retorno: null, valores: {nome: req.body.nome, usuario: req.body.usuario, email: req.body.email, celular: req.body.celular, cpf: req.body.cpf, password: req.body.password, confirmpassword: req.body.confirmpassword}, listaErros: listaErros });
    //     }
    // }

],

regrasValidacaoLogin: [
        body("email")
            .isEmail()
            .withMessage("Insira um email válido"),
        body("password")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)")
    ],


cadastrarUsuario: async (req, res) => {
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){

            console.log(errors);
            return res.render("pages/teste-cadastro", {
                valores: req.body,
                listaErros: errors,
            });
        }
    
   
        var dadosForm = {
            nome_usuario: req.body.nome,
            email_usuario: req.body.email,
            celular_usuario: req.body.celular,
            senha_usuario: bcrypt.hashSync(req.body.password, salt),
            cpf_usuario: req.body.cpf.replace(/[^\d]/g, ''),
            data_nasc_usuario: req.body.data_nasc,
            genero_usuario: req.body.genero,
            tipo_usuario: req.body.tipo_conta,
            user_usuario: req.body.usuario
             
        }; 
        
        try {

        const resultado = await usuariosModel.create(dadosForm);
        console.log("Usuário criado com sucesso.");

        // resultado.insertId é o ID do usuário recém criado
        const idUsuario = resultado.insertId;

        // Se for profissional, insere na tabela USUARIO_PROFISSIONAL
        if (dadosForm.tipo_usuario === 'profissional') {
            await usuariosModel.createProfissional({ ID_USUARIO: idUsuario });
            console.log("Usuário profissional inserido na tabela USUARIO_PROFISSIONAL.");
        }

        req.session.autenticado = {
        autenticado: true,
        id: idUsuario,
        tipo: dadosForm.tipo_usuario
    };


    
   if (dadosForm.tipo_usuario === "profissional") {
            return res.redirect("/explorar-logado");
        } else {
            return res.redirect("/explorar-c-c");
        }

        } catch (error) {
            console.log(error);
            res.json({ erro: "Falha ao acessar dados" });
           
        }
          

    },




 logar: (req, res) => {
    const autenticado = req.session.autenticado;

    if (autenticado && autenticado.autenticado !== null) {
        // Redireciona com base no tipo do usuário
        if (autenticado.tipo === "comum") {
            console.log("🔄 Redirecionando para página comum.");
            return res.redirect("/explorar-c-c");
        } else if (autenticado.tipo === "profissional") {
            console.log("🔄 Redirecionando para página profissional.");
            return res.redirect("/explorar-logado");
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


module.exports = usuariosController;
           

