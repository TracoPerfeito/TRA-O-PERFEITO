
var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const { verificadorCelular } = require("../helpers/validacoes");





router.get("/", function (req, res) {
    res.render('pages/index')
 
});


router.get("/contratar", function (req, res) {
    res.render('pages/contratar')
 
});


router.get("/index", function (req, res) {
    res.render('pages/index')
 
});


router.get("/quemsomos", function (req, res) {
    res.render('pages/quemsomos')
 
});

router.get("/perfil", function (req, res) {
    res.render('pages/perfil')
 
});


router.get("/publicacao", function (req, res) {
    res.render('pages/publicacao')
 
});

router.get("/chat", function (req, res) {
    res.render('pages/chat')
 
});

router.get("/teste", function (req, res) {
    res.render('pages/teste')
 
});


router.get("/menu", function (req, res) {
    res.render('pages/menu')
 
});


router.get("/menu-artista-logado", function (req, res) {
    res.render('pages/menu-artista-logado')
 
});


router.get("/meu-perfil-artista", function (req, res) {
    res.render('pages/meu-perfil-artista')
 
});







router.get("/login", function (req, res) {
    res.render('pages/login',  {retorno: null, valores: {email: "", password: ""}, errosLogin: null});

 
});



router.get("/planos", function (req, res) {
    res.render('pages/planos');

 
});

router.get("/quemcadastra", function (req, res) {
    res.render('pages/quemcadastra');
})


router.get("/contacomum", function (req, res) {
    res.render('pages/contacomum');

 
});


router.get("/cadastroArtista", function (req, res) {
    res.render('pages/cadastroArtista');

 
});


router.get("/oportunidades", function (req, res) {
    res.render('pages/oportunidades');

 
});

router.get("/cadastro", function (req, res) {
    res.render('pages/cadastro', {retorno: null, valores: {nome: "", sobrenome: "", email: "", celular: "", password: "", confirmpassword: ""}, listaErros: null});
 
});



router.post(
    "/cadastro",

    body("nome").isLength({ min: 1, max: 20 }).withMessage('O nome deve ter de 10 a 50 caracteres.'),

    body("sobrenome").isLength({ min: 2, max: 50 }).withMessage('O sobrenome deve ter de 10 a 50 caracteres.'),

    body("email").isEmail().withMessage('Insira um e-mail válido.'),

    body('celular').isLength({ min: 10, max: 11 }).withMessage('Número de celular inválido.')

       .custom(celular => verificadorCelular(celular)).withMessage('Número de celular inválido.'),

    body('password').isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres.'),
    body('confirmpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('As senhas não coincidem.');
        }
        return true;
    }),

    function (req, res) {

        const listaErros = validationResult(req);

        if (listaErros.isEmpty()) {

            return res.redirect("/index");
        } else {
        
            console.log(listaErros);
            return res.render("pages/cadastro", { retorno: null, valores: {nome: req.body.nome, sobrenome: req.body.sobrenome, email: req.body.email, celular: req.body.celular, password: req.body.password, confirmpassword: req.body.confirmpassword}, listaErros: listaErros });
        }
    }
);


router.post(
    "/login",

    body("email").isEmail().withMessage('Insira um e-mail válido.'),

    body('password').isLength({ min: 8 }).withMessage('Senha incorreta.'), //Vai estar como senha incorreta mas ná vdd é só pq não oito dígitos mesmo.
   
    function (req, res) {

        const errosLogin = validationResult(req);

        if (errosLogin.isEmpty()) {

            return res.redirect("/index"); // voltar pra página inicial mesmo
        } else {
            
            console.log(errosLogin);
            return res.render("pages/login", { retorno: null, valores: {email: req.body.email, password: req.body.password}, errosLogin: errosLogin});
        }
    }
);

module.exports = router;
