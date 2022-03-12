const { Client } = require('pg');

const conexao = new Client ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
  });

conexao.connect();



exports.listarTodas = (req, response) => {
  const query = 'select * from doacoes;'
  conexao.query(query, (err, res) => {
    // console.log(err, res.rows)
    if (err){
      console.log(err)
      response.status(500)
      response.json({"message": "Internal Server Error"})
    } else if (res.rows.length > 0){
      response.status(200)
      response.json(res.rows)
    } else {
      res.status(404)
      res.json({"message": "Nenhuma tarefa cadastrada com esse id"})
    }
  })
  }


exports.listarPorId = (req, response) => {
  const id = req.params.id
  const query = 'select * from doacoes where id_doacao = $1'
  conexao.query(query,[id], (err, res) => {
    if (err){
      console.log(err)
      response.status(500)
      response.json({"message": "Internal Server Error"})
    } else if (res.rows.length > 0){
      response.status(200)
      response.json(res.rows)
    } else {
      response.status(404)
      response.json({"message": "Nenhuma pessoa cadastrada com esse id"})
    }
  })
}

exports.inserir = (req, response) => {
  const doacao = {}
  console.log(req.body)
  doacao.id_produto = req.body.id_produto
  doacao.id_pessoa = req.body.id_pessoa
  doacao.nome_produto = req.body.nome_produto
  doacao.descricao_doacao = req.body.descricao_doacao
  doacao.qtd = req.body.qtd
 
  const query = 'insert into public.doacoes (id_produto, id_pessoa, nome_produto, descricao_doacao, qtd) values ($1, $2, $3, $4, $5)'
  // const queryDel = 'delete from public.estoque where id_produto = $1;'
 
  conexao.query(query, [doacao.id_produto,doacao.id_pessoa,doacao.nome_produto,doacao.descricao_doacao,doacao.qtd], (err, result) => {
    if (err){
      console.log(err)
      response.status(500)
      response.json({"message": "Internal Server Error"})
    } else {
      response.status(201)
      response.json({"message": result.insertId})
      // console.log("message": result.insertId)
    }
  })

  // conexao.query(queryDel, [doacao.id_produto], (err, result) => {
  //   if (err){
  //     console.log(err)
  //     response.status(500)
  //     response.json({"message": "Internal Server Error"})
  //   } else if (result.affectedRows > 0){
  //     response.status(200)
  //     response.json({"message": "produto deletado"})
  //   } else {
  //     // response.status(404)
  //     // response.json({"message": "Tarefa não encontrada"})
  //     response.status(200)
  //     response.json({"message": "produto deletado"})
  //   }
  // })
}

