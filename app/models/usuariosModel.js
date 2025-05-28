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

    
    findId: async (id) => {
        try {
            const [linhas,campos] = await pool.query('SELECT * FROM USUARIOS WHERE STATUS_USUARIO = "ativo" and ID_USUARIO = ?',[id] )
            return linhas;
        } catch (error) {
            console.log(error);
            return error;
        }
    },


    update: async (dadosForm, id) => {
        try {
            const [linhas] = await pool.query('UPDATE USUARIOS SET ? WHERE ID_USUARIO = ?', [dadosForm, id])
            return linhas;
        } catch (error) {
            console.log(error)
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