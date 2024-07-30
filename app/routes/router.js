var express = require("express");
var router = express.Router();


router.get("/", function (req, res) {
    res.render('pages/index')
 
});


router.get("/contratar", function (req, res) {
    res.render('pages/contratar')
 
});


router.get("/quemsomos", function (req, res) {
    res.render('pages/quemsomos')
 
});


router.get("/login", function (req, res) {
    res.render('pages/login');

 
});


router.get("/cadastro", function (req, res) {
    res.render('pages/cadastro');
 
});





module.exports = router;