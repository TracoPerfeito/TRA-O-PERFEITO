
var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const { verificadorCelular } = require("../helpers/validacoes");





router.get("/", function (req, res) { //index
    res.render('pages/index')
 
});


router.get("/contratar", function (req, res) { //contratar 
    res.render('pages/contratar')
 
});


router.get("/index", function (req, res) { //index
    res.render('pages/index')
 
});


router.get("/quemsomos", function (req, res) { //quemsomos
    res.render('pages/quemsomos')
 
});

router.get("/perfil", function (req, res) { //perfil-alheio
    res.render('pages/perfil')
 
});


router.get("/publicacao", function (req, res) { //publicacao
    res.render('pages/publicacao')
 
});



router.get("/chat", function (req, res) { //chat
    res.render('pages/chat')
 
});



router.get("/teste", function (req, res) {
    res.render('pages/teste')
 
});


router.get("/menu", function (req, res) { //menu
    res.render('pages/menu')
 
});


router.get("/menu-artista-logado", function (req, res) { //menu-logado
    res.render('pages/menu-artista-logado')
 
});


router.get("/meu-perfil-artista", function (req, res) { //perfil pessoal logado
    res.render('pages/meu-perfil-artista')
 
});



router.get("/explorar-logado", function (req, res) { //inicial logado
    res.render('pages/explorar-logado')
 
});


router.get("/contratar-logado", function (req, res) {  //contratar logado
    res.render('pages/contratar-logado')
 
});


router.get("/publicacaologado", function (req, res) { //publicação logado
    res.render('pages/publicacaologado')
 
});



router.get("/perfilalogado", function (req, res) { //perfil alheio logado
    res.render('pages/perfilalogado')
 
});



router.get("/nova-publicacao", function (req, res) { //publicação logado
    res.render('pages/nova-publicacao')
 
});



router.get("/nova-publi-pedido", function (req, res) { //perfil alheio logado
    res.render('pages/nova-publi-pedido')
 
});


router.get("/chat-logado", function (req, res) { //chat
    res.render('pages/chat-logado')
 
});

router.get("/propostadeprojeto", function (req, res) { //pagina de proposta de projeto
    res.render('pages/propostadeprojeto')
 
});

router.get("/avaliacoes", function (req, res) { //pagina das avaliações
    res.render('pages/avaliacoes')
 
});





router.get("/login", function (req, res) { //login
    res.render('pages/login',  {retorno: null, valores: {email: "", password: ""}, errosLogin: null});

 
});



router.get("/planos", function (req, res) { //planos
    res.render('pages/planos');

 
});

router.get("/quemcadastra", function (req, res) { //quem cadastra
    res.render('pages/quemcadastra');
})


router.get("/contacomum", function (req, res) {
    res.render('pages/contacomum');

 
});


router.get("/cadastroArtista", function (req, res) {
    res.render('pages/cadastroArtista');

 
});


router.get("/oportunidades", function (req, res) { //oportunidades logado
    res.render('pages/oportunidades');

 
});

router.get("/cadastro", function (req, res) { //cadastrar
    res.render('pages/cadastro', {retorno: null, valores: {nome: "", sobrenome: "", email: "", celular: "", password: "", confirmpassword: ""}, listaErros: null});
 
});



router.post( //validações cadastrar
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

            return res.redirect("/explorar-logado");
        } else {
        
            console.log(listaErros);
            return res.render("pages/cadastro", { retorno: null, valores: {nome: req.body.nome, sobrenome: req.body.sobrenome, email: req.body.email, celular: req.body.celular, password: req.body.password, confirmpassword: req.body.confirmpassword}, listaErros: listaErros });
        }
    }
);


router.post( //validações login
    "/login",

    body("email").isEmail().withMessage('Insira um e-mail válido.'),

    body('password').isLength({ min: 8 }).withMessage('Senha incorreta.'), //Vai estar como senha incorreta mas ná vdd é só pq não oito dígitos mesmo.
   
    function (req, res) {

        const errosLogin = validationResult(req);

        if (errosLogin.isEmpty()) {

            return res.redirect("/explorar-logado"); 
        } else {
            
            console.log(errosLogin);
            return res.render("pages/login", { retorno: null, valores: {email: req.body.email, password: req.body.password}, errosLogin: errosLogin});
        }
    }
);

module.exports = router;
