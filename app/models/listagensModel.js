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
  },


  listarPublicacoes: async () => {
  try {
    // 1) Buscar publicações sem imagens
    const [publicacoes] = await pool.query(`
      SELECT 
        p.ID_PUBLICACAO,
        p.ID_USUARIO,
        p.NOME_PUBLICACAO,
        p.DESCRICAO_PUBLICACAO,
        p.CATEGORIA,
        u.NOME_USUARIO,
        u.FOTO_PERFIL_PASTA_USUARIO,
        GROUP_CONCAT(DISTINCT t.NOME_TAG) AS TAGS
      FROM PUBLICACOES_PROFISSIONAL p
      LEFT JOIN TAGS_PUBLICACOES tp ON p.ID_PUBLICACAO = tp.ID_PUBLICACAO
      LEFT JOIN TAGS t ON tp.ID_TAG = t.ID_TAG
      LEFT JOIN USUARIOS u ON p.ID_USUARIO = u.ID_USUARIO
      GROUP BY p.ID_PUBLICACAO
      ORDER BY p.ID_PUBLICACAO DESC
      LIMIT 50
    `);

    // 2) Buscar todas as imagens das publicações listadas
    const ids = publicacoes.map(pub => pub.ID_PUBLICACAO);
    if(ids.length === 0) return [];

    const [imgs] = await pool.query(`
      SELECT ID_PUBLICACAO, IMG_PUBLICACAO
      FROM CONTEUDOS_PUBLICACAO_PROFISSIONAL
      WHERE ID_PUBLICACAO IN (?)
    `, [ids]);

    // 3) Mapear imagens para cada publicação
    const imagensPorPublicacao = {};
    imgs.forEach(img => {
      if(!imagensPorPublicacao[img.ID_PUBLICACAO]) imagensPorPublicacao[img.ID_PUBLICACAO] = [];
      imagensPorPublicacao[img.ID_PUBLICACAO].push(img.IMG_PUBLICACAO);
    });

    // 4) Adicionar o array de imagens em cada publicação
    publicacoes.forEach(pub => {
      pub.imagens = imagensPorPublicacao[pub.ID_PUBLICACAO] || [];
    });

    return publicacoes;

  } catch (error) {
    console.error("Erro ao tentar listar publicações:", error);
    return [];
  }
},


  
 findIdPublicacao: async (id) => {
  try {
    // 1) Buscar dados da publicação sem as imagens
const [pubRows] = await pool.query(`
  SELECT 
    p.ID_PUBLICACAO,
    p.ID_USUARIO,
    p.NOME_PUBLICACAO,
    p.DESCRICAO_PUBLICACAO,
    p.CATEGORIA,
    u.NOME_USUARIO,
    u.FOTO_PERFIL_PASTA_USUARIO,
    GROUP_CONCAT(DISTINCT t.NOME_TAG) AS TAGS
  FROM PUBLICACOES_PROFISSIONAL p
  LEFT JOIN TAGS_PUBLICACOES tp ON p.ID_PUBLICACAO = tp.ID_PUBLICACAO
  LEFT JOIN TAGS t ON tp.ID_TAG = t.ID_TAG
  LEFT JOIN USUARIOS u ON p.ID_USUARIO = u.ID_USUARIO
  WHERE p.ID_PUBLICACAO = ?
  GROUP BY p.ID_PUBLICACAO
`, [id]);

if(pubRows.length === 0) return null;

// 2) Buscar todas as imagens dessa publicação
const [imgsRows] = await pool.query(`
  SELECT IMG_PUBLICACAO 
  FROM CONTEUDOS_PUBLICACAO_PROFISSIONAL 
  WHERE ID_PUBLICACAO = ?
`, [id]);

// 3) Montar o objeto com o array de imagens
const publicacao = pubRows[0];
publicacao.imagens = imgsRows.map(row => row.IMG_PUBLICACAO);

return publicacao;

  } catch (error) {
    console.log(error);
    throw error;
  }
},


listarPublicacoesPorUsuario: async (idUsuario) => {
  try {
    // 1) Buscar publicações do usuário específico
    const [publicacoes] = await pool.query(`
      SELECT 
        p.ID_PUBLICACAO,
        p.ID_USUARIO,
        p.NOME_PUBLICACAO,
        p.DESCRICAO_PUBLICACAO,
        p.CATEGORIA,
        u.NOME_USUARIO,
        u.FOTO_PERFIL_PASTA_USUARIO,
        GROUP_CONCAT(DISTINCT t.NOME_TAG) AS TAGS
      FROM PUBLICACOES_PROFISSIONAL p
      LEFT JOIN TAGS_PUBLICACOES tp ON p.ID_PUBLICACAO = tp.ID_PUBLICACAO
      LEFT JOIN TAGS t ON tp.ID_TAG = t.ID_TAG
      LEFT JOIN USUARIOS u ON p.ID_USUARIO = u.ID_USUARIO
      WHERE p.ID_USUARIO = ?
      GROUP BY p.ID_PUBLICACAO
      ORDER BY p.ID_PUBLICACAO DESC
    `, [idUsuario]);

    // 2) Buscar todas as imagens das publicações listadas
    const ids = publicacoes.map(pub => pub.ID_PUBLICACAO);
    if (ids.length === 0) return [];

    const [imgs] = await pool.query(`
      SELECT ID_PUBLICACAO, IMG_PUBLICACAO
      FROM CONTEUDOS_PUBLICACAO_PROFISSIONAL
      WHERE ID_PUBLICACAO IN (?)
    `, [ids]);

    // 3) Mapear imagens para cada publicação
    const imagensPorPublicacao = {};
    imgs.forEach(img => {
      if (!imagensPorPublicacao[img.ID_PUBLICACAO]) imagensPorPublicacao[img.ID_PUBLICACAO] = [];
      imagensPorPublicacao[img.ID_PUBLICACAO].push(img.IMG_PUBLICACAO);
    });

    // 4) Adicionar o array de imagens em cada publicação
    publicacoes.forEach(pub => {
      pub.imagens = imagensPorPublicacao[pub.ID_PUBLICACAO] || [];
    });

    return publicacoes;

  } catch (error) {
    console.error("Erro ao listar publicações do usuário:", error);
    return [];
  }
},

listarPublicacoesPorUsuario: async (idUsuario) => {
  try {
    // 1) Buscar publicações do usuário específico
    const [publicacoes] = await pool.query(`
      SELECT 
        p.ID_PUBLICACAO,
        p.ID_USUARIO,
        p.NOME_PUBLICACAO,
        p.DESCRICAO_PUBLICACAO,
        p.CATEGORIA,
        u.NOME_USUARIO,
        u.FOTO_PERFIL_PASTA_USUARIO,
        GROUP_CONCAT(DISTINCT t.NOME_TAG) AS TAGS
      FROM PUBLICACOES_PROFISSIONAL p
      LEFT JOIN TAGS_PUBLICACOES tp ON p.ID_PUBLICACAO = tp.ID_PUBLICACAO
      LEFT JOIN TAGS t ON tp.ID_TAG = t.ID_TAG
      LEFT JOIN USUARIOS u ON p.ID_USUARIO = u.ID_USUARIO
      WHERE p.ID_USUARIO = ?
      GROUP BY p.ID_PUBLICACAO
      ORDER BY p.ID_PUBLICACAO DESC
    `, [idUsuario]);

    // 2) Buscar todas as imagens das publicações listadas
    const ids = publicacoes.map(pub => pub.ID_PUBLICACAO);
    if (ids.length === 0) return [];

    const [imgs] = await pool.query(`
      SELECT ID_PUBLICACAO, IMG_PUBLICACAO
      FROM CONTEUDOS_PUBLICACAO_PROFISSIONAL
      WHERE ID_PUBLICACAO IN (?)
    `, [ids]);

    // 3) Mapear imagens para cada publicação
    const imagensPorPublicacao = {};
    imgs.forEach(img => {
      if (!imagensPorPublicacao[img.ID_PUBLICACAO]) imagensPorPublicacao[img.ID_PUBLICACAO] = [];
      imagensPorPublicacao[img.ID_PUBLICACAO].push(img.IMG_PUBLICACAO);
    });

    // 4) Adicionar o array de imagens em cada publicação
    publicacoes.forEach(pub => {
      pub.imagens = imagensPorPublicacao[pub.ID_PUBLICACAO] || [];
    });

    return publicacoes;

  } catch (error) {
    console.error("Erro ao listar publicações do usuário:", error);
    return [];
  }
},






};


module.exports = listagensModel;