var pool = require("../../config/pool_conexoes");


const publicacoesModel = { 
    
    
  criarPublicacao: async (dados) => {
        try {
            const [result] = await pool.query(
    'INSERT INTO PUBLICACOES_PROFISSIONAL (ID_USUARIO, NOME_PUBLICACAO, DESCRICAO_PUBLICACAO, CATEGORIA) VALUES (?, ?, ?, ?)',
    [dados.ID_USUARIO, dados.NOME_PUBLICACAO, dados.DESCRICAO_PUBLICACAO, dados.CATEGORIA]
  );
  return result.insertId; 
        } catch (error) {
            console.error('Erro ao criar publicação:', error);
            return null;
        }
    },

inserirConteudo: async (idPublicacao, imgBuffer) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO CONTEUDOS_PUBLICACAO_PROFISSIONAL (ID_PUBLICACAO, IMG_PUBLICACAO) VALUES (?, ?)',
      [idPublicacao, imgBuffer]
    );
    return result;
  } catch (error) {
    console.error('Erro ao inserir imagem:', error);
    return null;
  }
}
,


    buscarTagPorNome: async (nomeTag) => {
        try {
            const [rows] = await pool.query('SELECT * FROM TAGS WHERE NOME_TAG = ?', [nomeTag]);
            return rows[0]; // retorna a tag se existir
        } catch (error) {
            console.error('Erro ao buscar tag:', error);
            return null;
        }
    },

    criarTag: async (nomeTag) => {
        try {
            const [result] = await pool.query('INSERT INTO TAGS (NOME_TAG) VALUES (?)', [nomeTag]);
            return result.insertId;
        } catch (error) {
            console.error('Erro ao criar tag:', error);
            return null;
        }
    },

    associarTagPublicacao: async (idTag, idPublicacao) => {
        try {
            await pool.query(
                'INSERT INTO TAGS_PUBLICACOES (ID_TAG, ID_PUBLICACAO) VALUES (?, ?)',
                [idTag, idPublicacao]
            );
        } catch (error) {
            console.error('Erro ao associar tag com publicação:', error);
        }
    },

<<<<<<< HEAD
    
=======

      deletarPublicacao: async (idPublicacao) => {
        try {
            const [result] = await pool.query
            ('DELETE FROM PUBLICACOES_PROFISSIONAL WHERE ID_PUBLICACAO = ?', 
            [idPublicacao]);

            console.log("Publicação apagada pelo Model.")
       return result; 
        } catch (error) {
            console.error('Erro ao excluir publicação:', error);
            return null;
        }
    },
>>>>>>> a71f5122e3b9ab2c2570a80cf2c528c9b1c4fb2e

   
};


module.exports = publicacoesModel;