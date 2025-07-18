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
}



};


module.exports = listagensModel;