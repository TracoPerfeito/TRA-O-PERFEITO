const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, callBack) => {
  const allowedExtensions = /jpeg|jpg|png|gif/;
  const extname = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedExtensions.test(file.mimetype);

  if (extname && mimetype) {
    return callBack(null, true);
  } else {
    callBack(new Error("Apenas arquivos de imagem são permitidos!"));
  }
};

module.exports = function (caminho = null, tamanhoArq = 3) {
  let upload;
  if (caminho == null) {
    // Versão com armazenamento em SGBD
    const storage = multer.memoryStorage();
    upload = multer({
      storage: storage,
      limits: { fileSize: tamanhoArq * 1024 * 1024 },
      fileFilter: fileFilter,
    });
  } else {
    // Versão com armazenamento em diretório
    var storagePasta = multer.diskStorage({
      destination: (req, file, callBack) => {
        callBack(null, caminho);
      },
      filename: (req, file, callBack) => {
        callBack(
          null,
          file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
      },
    });
    upload = multer({
      storage: storagePasta,
      limits: { fileSize: tamanhoArq * 1024 * 1024 },
      fileFilter: fileFilter,
    });
  }

  // Método para single file
  const single = (campoArquivo) => {
    return (req, res, next) => {
      req.session.erroMulter = null;
      upload.single(campoArquivo)(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          req.session.erroMulter = {
            value: '',
            msg: err.message,
            path: campoArquivo
          }
        } else if (err) {
          req.session.erroMulter = {
            value: '',
            msg: err.message,
            path: campoArquivo
          }
        }
        next();
      });
    };
  };

  // Método para múltiplos campos
  const multi = (camposArray) => {
    return (req, res, next) => {
      req.session.erroMulter = null;
      upload.fields(camposArray)(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          req.session.erroMulter = {
            value: '',
            msg: err.message,
            path: 'multi'
          }
        } else if (err) {
          req.session.erroMulter = {
            value: '',
            msg: err.message,
            path: 'multi'
          }
        }
        next();
      });
    };
  };

  // Exporta ambos os métodos
  return Object.assign(single, { multi });
};