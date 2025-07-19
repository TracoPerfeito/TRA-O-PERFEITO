var pool = require("../../config/pool_conexoes");

const listagensModel = {


    buscarProfissionaisComEspecializacao: async () => {
  try {
    const [linhas] = await pool.query(`
      SELECT 
        u.ID_USUARIO, 
        u.NOME_USUARIO, 
        u.FOTO_PERFIL_PASTA_USUARIO,
        u.IMG_BANNER_PASTA_USUARIO,
        u.DESCRICAO_PERFIL_USUARIO,
        up.ESPECIALIZACAO_DESIGNER
      FROM USUARIOS u
      LEFT JOIN USUARIO_PROFISSIONAL up ON u.ID_USUARIO = up.ID_USUARIO
      WHERE u.TIPO_USUARIO = 'profissional' 
        AND u.STATUS_USUARIO = 'ativo'
    `);

    console.log(linhas); // opcional: só pra debug
    return linhas;

  } catch (error) {
    console.error("Erro ao buscar profissionais:", error);
    return [];
  }
},

  findId: async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM USUARIOS WHERE ID_USUARIO = ?', [id]);
    if (rows.length === 0) {
      return null; // Retorna null se não encontrou
    }
    return rows[0]; // Retorna o usuário (objeto)
  } catch (error) {
    console.log(error);
    throw error; // Lança erro para o controller tratar
  }
},

findEspecializacaoByUserId: async (id) => {
    try {
      const [linhas] = await pool.query(
        'SELECT ESPECIALIZACAO_DESIGNER FROM USUARIO_PROFISSIONAL WHERE ID_USUARIO = ? LIMIT 1',
        [id]
      );
      return linhas.length > 0 ? linhas[0].ESPECIALIZACAO_DESIGNER : null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


};


module.exports = listagensModel;