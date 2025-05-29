// function injetarLocais(req, res, next) {
//   res.locals.tipo_usuario = req.session.autenticado?.tipo || null;
//   res.locals.valores = req.session.autenticado || {};
//   next();
// }

// module.exports = injetarLocais;


function injetarLocais(req, res, next) {
  if (req.session.autenticado) {
    res.locals.tipo_usuario = req.session.autenticado.tipo;
    res.locals.nome_usuario = req.session.autenticado.nome;  
  } else {
    res.locals.tipo_usuario = null;
    res.locals.nome_usuario = null;
  }
  next();
}


module.exports = injetarLocais;