const express = require('express')
const router = express.Router()
const doacoesController = require('../controllers/doacoesController')

// Lista de rotas
router.get('/todas', doacoesController.listarTodas)
router.get('/:id', doacoesController.listarPorId)
router.post('/', doacoesController.inserir)
// router.put('/:id', pessoasController.alterar)
// router.delete('/:id', pessoasController.deletar)
// Exportando as rotas
module.exports = router