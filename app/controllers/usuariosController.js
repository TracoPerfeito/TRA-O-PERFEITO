const usuariosModel = require("../models/usuariosModel");
const { body, validationResult } = require("express-validator");
const moment = require("moment");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const {removeImg} = require("../util/removeImg");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const https = require('https');


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
            .isEmail().withMessage('Insira um email válido.'),
        body("password")
             .notEmpty().withMessage('Insira sua senha.')
    ],

    regrasValidacaoPerfil: [
    body("nome_usu")
        .isLength({ min: 3, max: 45 })
        .withMessage("O nome deve ter entre 3 e 45 caracteres."),

    body("nomeusu_usu")
        .isLength({ min: 4, max: 30 })
        .withMessage("O nome de usuário deve ter entre 4 e 30 caracteres."),

    body("email_usu")
        .isEmail()
        .withMessage("Digite um e-mail válido."),

    body("fone_usu")
        .isLength({ min: 11, max: 15 })
        .withMessage("Digite um número de telefone válido."),

    body("especialidade")
        .optional({ checkFalsy: true })
        .isLength({ max: 100 })
        .withMessage("A especialidade deve ter no máximo 100 caracteres."),

    body("desc-perfil")
        .optional({ checkFalsy: true })
        .isLength({ max: 500 })
        .withMessage("A descrição deve ter no máximo 500 caracteres."),

    verificarUsuAutorizado(["profissional", "comum"], "pages/acesso-negado"),
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
            tipo: dadosForm.tipo_usuario,
            nome: dadosForm.nome_usuario
        };

        // E redireciona
        return res.redirect("/index");

    


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
            return res.redirect("/");
        } else if (autenticado.tipo === "profissional") {
            console.log("🔄 Redirecionando para página profissional.");
            return res.redirect("/");
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
},


    mostrarPerfil: async (req, res) => {
    try {
        let results = await usuario.findId(req.session.autenticado.id);

        let campos = {
            nome_usu: results[0].NOME_USUARIO,
            email_usu: results[0].EMAIL_USUARIO,
            celular_usu: results[0].CELULAR_USUARIO, // ou celular_usu, dependendo do seu form
            img_perfil_pasta: results[0].FOTO_PERFIL_PASTA_USUARIO,
            img_perfil_banco: results[0].FOTO_PERFIL_BANCO_USUARIO != null
                ? `data:image/jpeg;base64,${results[0].FOTO_PERFIL_BANCO_USUARIO.toString('base64')}`
                : null,
            nomeusu_usu: results[0].USER_USUARIO,
            senha_usu: ""
        };

        res.render("pages/meu-perfil-artista", { listaErros: null, valores: campos });
    } catch (e) {
        console.log(e);
        res.render("pages/meu-perfil-artista", {
            listaErros: null,
            valores: {
                nome_usu: "", email_usu: "", fone_usu: "",
                img_perfil_pasta: "", img_perfil_banco: "",
                nomeusu_usu: "", senha_usu: ""
            }
        });
    }
},

gravarPerfil: async (req, res) => {
    const erros = validationResult(req);
    const erroMulter = req.session.erroMulter;

    if (!erros.isEmpty() || erroMulter != null) {
        let lista = !erros.isEmpty() ? erros : { formatter: null, errors: [] };
        if (erroMulter != null) lista.errors.push(erroMulter);
        return res.render("pages/meu-perfil-artista", { listaErros: lista, valores: req.body });
    }

    try {
        let dadosForm = {
            user_usuario: req.body.nomeusu_usu,
            nome_usuario: req.body.nome_usu,
            email_usuario: req.body.email_usu,
            celular_usuario: req.body.fone_usu,
            img_perfil_banco: req.session.autenticado.img_perfil_banco,
            img_perfil_pasta: req.session.autenticado.img_perfil_pasta,
        };

        if (req.body.senha_usu !== "") {
            dadosForm.senha_usuario = bcrypt.hashSync(req.body.senha_usu, salt);
        }
        if (!req.file) {
                console.log("Falha no carregamento");
            } else {
            const caminhoArquivo = "imagem/perfil/" + req.file.filename;

            if (dadosForm.img_perfil_pasta !== caminhoArquivo) {
                removeImg(dadosForm.img_perfil_pasta);
            }

            dadosForm.img_perfil_pasta = caminhoArquivo;
            dadosForm.img_perfil_banco = null;
        }

        const resultUpdate = await usuario.update(dadosForm, req.session.autenticado.id);

        if (resultUpdate.changedRows === 1) {
            const result = await usuario.findId(req.session.autenticado.id);
            req.session.autenticado = {
                autenticado: result[0].NOME_USUARIO,
                id: result[0].ID_USUARIO,
                tipo: result[0].ID_TIPO_USUARIO,
                img_perfil_banco: result[0].FOTO_PERFIL_BANCO_USUARIO != null
                    ? `data:image/jpeg;base64,${result[0].FOTO_PERFIL_BANCO_USUARIO.toString('base64')}`
                    : null,
                img_perfil_pasta: result[0].FOTO_PERFIL_PASTA_USUARIO
            };

            const campos = {
                nome_usu: result[0].NOME_USUARIO,
                email_usu: result[0].EMAIL_USUARIO,
                nomeusu_usu: result[0].USER_USUARIO,
                fone_usu: result[0].CELULAR_USUARIO,
                img_perfil_pasta: result[0].FOTO_PERFIL_PASTA_USUARIO,
                img_perfil_banco: result[0].FOTO_PERFIL_BANCO_USUARIO,
                senha_usu: ""
            };

            res.render("pages/meu-perfil-artista", { listaErros: null, valores: campos });
        } else {
            res.render("pages/meu-perfil-artista", { listaErros: null, valores: dadosForm });
        }
    } catch (e) {
        console.log(e);
        res.render("pages/meu-perfil-artista", { listaErros: erros, valores: req.body });
    }
}


};













    



   



  



module.exports = usuariosController;
           

