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

    findUserEmail: async (camposForm) => {
            try {
                const [resultados] = await pool.query(
                    "SELECT * FROM usuario WHERE user_usuario = ? or email_usuario = ?",
                    [camposForm.user_usuario, camposForm.user_usuario]
                )
                return resultados;
            } catch (error) {
                console.log(error);
                return error;
            }
        },

        findCampoCustom: async (criterioWhere) => {
            try {
                const [resultados] = await pool.query(
                    "SELECT count(*) totalReg FROM usuario WHERE ?",
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
                const [resultados] = await pool.query(
                    "SELECT u.id_usuario, u.nome_usuario, u.user_usuario, " +
                    "u.senha_usuario, u.email_usuario, u.fone_usuario, u.tipo_usuario, " +
                    "u.status_usuario,u.numero_usuario, u.cep_usuario,u.img_perfil_banco, u.img_perfil_pasta," +
                    "t.id_tipo_usuario, t.descricao_usuario " +
                    "FROM usuario u, tipo_usuario t where u.status_usuario = 1 and " +
                    "u.tipo_usuario = t.id_tipo_usuario and u.id_usuario = ? ", [id]
                )
                return resultados;
            } catch (error) {
                console.log(error);
                return error;
            }
        },


   
        update: async (camposForm, id) => {
            try {
                const [resultados] = await pool.query(
                    "UPDATE usuario SET ? " +
                    " WHERE id_usuario = ?",
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


        



    
   
};
    

module.exports = usuariosModel;