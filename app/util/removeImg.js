const fs = require("fs");

function removeImg(caminho) {
    fs.unlink('app/public/' + caminho, function (err) {
        if (err && err.code == 'ENOENT') {
            console.log("Arquivo não existe, não foi possível apagar!");
            return false;
        } else if (err) {
            console.log("Erro ao tentar apagar o arquivo");
            return false;
        } else {
            return true;
        }
    });
}

module.exports = { removeImg }