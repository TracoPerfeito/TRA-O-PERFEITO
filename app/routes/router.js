
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


router.get("/pedido", function (req, res) { //pedido (publicacao do oportunidades)
    res.render('pages/pedido')
 
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

router.get("/explorar-c-c", function (req, res) { //explorar conta comum logada
    res.render('pages/explorar-c-c')
 
});



router.get("/contratar-c-c", function (req, res) { // contratar conta comum
    res.render('pages/contratar-c-c')
 
});



router.get("/nova-publi-c-c", function (req, res) { //nova publicacao conta comum
    res.render('pages/nova-publi-c-c')
 
});


router.get("/publicacao-c-c", function (req, res) { //publicacao conta comum
    res.render('pages/publicacao-c-c')
 
});


router.get("/perfil-a-c-c", function (req, res) { //perfil alheio conta comum
    res.render('pages/perfil-a-c-c')
 
});


router.get("/meu-perfil-c-c", function (req, res) { //meu perfil conta comum
    res.render('pages/meu-perfil-c-c')
 
});


router.get("/chat-c-c", function (req, res) { //chat conta comum
    res.render('pages/chat-c-c')
 
});


router.get("/tabela-pagamentos", function (req, res) { //Tabela de pagamentos
    res.render('pages/tabela-pagamentos')
 
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
    res.render('pages/cadastro', {retorno: null, valores: {nome: "", usuario: "", email: "", celular: "", password: "", confirmpassword: ""}, listaErros: null});
 
});



router.post( //validações cadastrar
    "/cadastro",

    body("nome").isLength({ min: 2, max: 50 }).withMessage('O nome deve ter de 3 a 50 caracteres.'),

    body("usuario").isLength({ min: 10, max: 20 }).withMessage('O usuario deve ter de 10 a 20 caracteres.'),

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
            return res.render("pages/cadastro", { retorno: null, valores: {nome: req.body.nome, usuario: req.body.usuario, email: req.body.email, celular: req.body.celular, password: req.body.password, confirmpassword: req.body.confirmpassword}, listaErros: listaErros });
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

            return res.redirect("/explorar-c-c"); 
        } else {
            
            console.log(errosLogin);
            return res.render("pages/login", { retorno: null, valores: {email: req.body.email, password: req.body.password}, errosLogin: errosLogin});
        }
    }
);

module.exports = router;
