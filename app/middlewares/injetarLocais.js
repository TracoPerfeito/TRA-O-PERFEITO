// function injetarLocais(req, res, next) {
//   res.locals.tipo_usuario = req.session.autenticado?.tipo || null;
//   res.locals.valores = req.session.autenticado || {};
//   next();
// }

// module.exports = injetarLocais;


function injetarLocais(req, res, next) {
  if (req.session.autenticado) {
    res.locals.autenticado = req.session.autenticado || {};

    res.locals.tipo_usuario = req.session.autenticado.tipo;
    res.locals.nome_usuario = req.session.autenticado.nome;  
    res.locals.user_usuario = req.session.autenticado.user; 
     res.locals.foto_perfil_pasta = req.session.autenticado.foto_perfil_pasta; 
    res.locals.descricao_perfil = req.session.autenticado.descricao_perfil; 
  } else {
    res.locals.tipo_usuario = null;
    res.locals.nome_usuario = null;
    res.locals.user_usuario = null;
    res.locals.foto_perfil_pasta = null;
    res.locals.descricao_perfil = null;
  }
  next();
}


module.exports = injetarLocais;