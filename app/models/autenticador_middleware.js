const { validationResult } = require("express-validator");
const usuario = require("./usuariosModel");
const bcrypt = require("bcryptjs");

verificarUsuAutenticado = (req, res, next) => {
    if (req.session.autenticado) {
        var autenticado = req.session.autenticado;
        req.session.logado = req.session.logado + 1;
    } else {
        var autenticado = { autenticado: null, id: null, tipo: null };
        req.session.logado = 0;
    }
    req.session.autenticado = autenticado;
    next();
};

limparSessao = (req, res, next) => {
  req.session.destroy();
  next();
};

gravarUsuAutenticado = async (req, res, next) => {
    const erros = validationResult(req);
     console.log("req.body:", req.body);

    if (!erros.isEmpty()) {
        console.log("⚠️ Erros de validação:", erros.array());
        return res.render("pages/login", {
            valores: req.body,
            errosLogin: erros.array(),
            retorno: "Erro de validação nos dados informados."
        });
    }

    const dadosForm = {
        email: req.body.email,
        senha_usuario: req.body.password,
    };

    const results = await usuario.findUserEmail(dadosForm);

    if (results.length === 0) {
        console.log("❌ Email não encontrado:", dadosForm.email);
        return res.render("pages/login", {
            valores: req.body,
            errosLogin: [],
            retorno: "Email não encontrado."
        });
    }

    const usuarioEncontrado = results[0];
    console.log("🧾 usuarioEncontrado:", usuarioEncontrado);


    console.log("🔐 senha digitada:", req.body.password);
    console.log("🔐 senha do banco:", usuarioEncontrado.SENHA_USUARIO);

    const senhaCorreta = bcrypt.compareSync(req.body.password, usuarioEncontrado.SENHA_USUARIO);

    if (!senhaCorreta) {
        console.log("❌ Senha incorreta para o email:", dadosForm.email);
        return res.render("pages/login", {
            valores: req.body,
            errosLogin: [],
            retorno: "Senha incorreta."
        });
    }

    // Se chegou aqui, está tudo certo
    req.session.autenticado = {
        autenticado: usuarioEncontrado.NOME_USUARIO,
        nome: usuarioEncontrado.NOME_USUARIO,
        user: usuarioEncontrado.USER_USUARIO,
        id: usuarioEncontrado.ID_USUARIO,
        tipo: usuarioEncontrado.TIPO_USUARIO,
        img_perfil_pasta: usuarioEncontrado.FOTO_PERFIL_PASTA_USUARIO,
        img_capa_pasta: usuarioEncontrado.IMG_BANNER_PASTA_USUARIO,
        descricao_perfil: usuarioEncontrado.DESCRICAO_PERFIL_USUARIO
    };

    console.log("✅ Login realizado com sucesso:", req.session.autenticado);
    req.session.logado = 0;
    next();
};


verificarUsuAutorizado = (tipoPermitido, destinoFalha) => {
    return (req, res, next) => {
        if (req.session.autenticado.autenticado != null &&
            tipoPermitido.find(function (element) { return element == req.session.autenticado.tipo }) != undefined) {
            next();
        } else {
            res.render(destinoFalha, req.session.autenticado);
        }
    };
}

module.exports = {
  verificarUsuAutenticado,
  limparSessao,
  gravarUsuAutenticado,
  verificarUsuAutorizado,
};
