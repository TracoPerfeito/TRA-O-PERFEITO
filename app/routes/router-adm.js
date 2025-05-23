const express = require("express");
const router = express.Router();
const admController = require("../controllers/admController");


router.get("/", verificarUsuAutorizado(["administrador"], "pages/acesso-negado"), function (req, res) { 
    res.render('pages/adm-inicial', req.session.autenticado)
 
});


router.get("/adm-login", function (req, res) { //login
    res.render('pages/adm-login',  {retorno: null, valores: {email: "", password: ""}, errosLogin: null});

 
});



router.post( //validações login
    "/adm-login",
    function (req, res, next) {
      console.log("POST /adm-login recebido");
      next();
    },
    admController.regrasValidacaoLogin, 
    gravarUsuAutenticado,
    function (req, res) {
      admController.logar(req, res);
    }
);




module.exports = router
