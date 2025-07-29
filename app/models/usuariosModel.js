var pool = require("../../config/pool_conexoes");

const usuariosModel = {

 
   findAll: async () => {     
    try {
        const [linhas] = await
            pool.query("SELECT * FROM USUARIOS WHERE STATUS_USUARIO = 'ativo'");
    
        console.log(linhas);
        return linhas;
    } catch (error) {
        console.log(error);
        return error;
    }

},


   

    create: async (dadosForm) => {
        try {
            const [linhas, campos] = await pool.query('INSERT INTO USUARIOS SET ?', [dadosForm])
            console.log(linhas);
            console.log(campos);
            
            return linhas;
        } catch (error) {
            console.log(error);
            return null;
        }  
    },


    createProfissional: async (dadosForm) => {
    try {
        // dadosForm é { ID_USUARIO: idUsuario }
        const [linhas, campos] = await pool.query('INSERT INTO USUARIO_PROFISSIONAL SET ?', [dadosForm]);
        console.log(linhas);
        console.log(campos);

        return linhas;
    } catch (error) {
        console.log(error);
        return null;
    }
},

    










    delete: async (id) => {
        try {
            const [linhas,campos] = await pool.query('UPDATE USUARIOS SET STATUS_USUARIO = "inativo"  WHERE ID_USUARIO = ?', [id])
            return linhas;
          
        } catch (error) {
            console.log(error);
            return error;
            
        }  
    },

        findCampoCustom: async (criterioWhere) => {
            try {
                const [resultados] = await pool.query(
                    "SELECT count(*) totalReg FROM USUARIOS WHERE ?",
                    [criterioWhere]
                )
                return resultados[0].totalReg;
            } catch (error) {
                console.log(error);
                return error;
            }
        },

        findId: async (id) => {
        try {
            const [linhas,campos] = await pool.query('SELECT * FROM USUARIOS WHERE STATUS_USUARIO = 1 and ID_USUARIO = ?',[id] )
            const usuario = linhas[0];
            if (!usuario) {
                throw new Error("Usuário não encontrado");
            }
                    
            return linhas;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    findProfissional: async (id) => {
    try {
        const [linhas] = await pool.query(
            'SELECT * FROM USUARIO_PROFISSIONAL WHERE ID_USUARIO = ?',
            [id]
        );
        return linhas;
    } catch (error) {
        console.log(error);
        return error;
    }
},



   
        update: async (camposForm, id) => {
            try {
                const [resultados] = await pool.query(
                    "UPDATE USUARIOS SET ? " +
                    " WHERE ID_USUARIO = ?",
                    [camposForm, id]
                )
                return resultados;
            } catch (error) {
                console.log(error);
                return error;
            }
        },

        
        updateProfissional: async (camposForm, id) => {
            try {
                const [resultados] = await pool.query(
                    "UPDATE USUARIO_PROFISSIONAL SET ? " +
                    " WHERE ID_USUARIO = ?",
                    [camposForm, id]
                )
                return resultados;
            } catch (error) {
                console.log(error);
                return error;
            }
        },













    

    findUserEmail: async (camposForm) => {
            try {
                const [resultados] = await pool.query(
                    "SELECT * FROM USUARIOS WHERE EMAIL_USUARIO = ?",
                    [camposForm.email]
                )
                return resultados;
            } catch (error) {
                console.log(error);
                return error;
            }
        },


    verificarDuplicidade: async (email, celular, nomeUsuario, idAtual) => {
  try {
    const sql = `
      SELECT * FROM USUARIOS 
      WHERE 
        (EMAIL_USUARIO = ? OR CELULAR_USUARIO = ? OR USER_USUARIO = ?)
        AND ID_USUARIO != ?
    `;
    const [result] = await pool.query(sql, [email, celular, nomeUsuario, idAtual]);

    return result.length > 0 ? result : null;
  } catch (error) {
    console.error(error);
    return error; 
  }
}






        



    
   
};
    

module.exports = usuariosModel;