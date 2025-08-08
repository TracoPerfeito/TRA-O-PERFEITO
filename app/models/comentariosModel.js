var pool = require("../../config/pool_conexoes");

const comentariosModel = {

 

    createComment: async (dadosForm) => {
        try {
            const [result] = await pool.query('INSERT INTO COMENTARIOS SET ?', [dadosForm])
            console.log(result);
            return result.insertId; 
            
        } catch (error) {
            console.log('Erro ao salvar comentario:', error);
            return null;
        }  
    },

};

    

module.exports = comentariosModel;