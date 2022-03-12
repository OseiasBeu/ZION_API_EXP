// Importando o expressjs
const express = require('express')

// Criando uma instância do expressjs
const app = express()

//Importanto variaveis de ambiente
require('dotenv').config()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./docs/swagger.yml')

app.use(morgan('dev'))
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))
app.use(cors());

// Criando uma rota
app.get('/', (req, res) => {
  res.send('<h1>Olá mundo!</h1>')
})

// Rotas
const apiRouter = require('./routes/apiRouter')
app.use('/api/v1/auth', apiRouter)



const doacoesRouter = require('./routes/doacoesRouter')
app.use('/api/v1/doacoes', doacoesRouter)


// Configurando o servidor
const port = process.env.PORT
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })
