//importar o express para ter acesso ao sistema de rotas e utilizar os verbos do CRUD
const express = require("express")
//importar o cors e colocar dentro de uma variável
const cors = require("cors")
//criar uma contante chamada app, ela chama a função express e a faz funcionar
const app = express()

// body-parser, pelo app, utilizando o metodo use, e vai chamar o express.json
app.use(express.json())
// depois configurar acessando o metodo use pelo app, chamando o cors
app.use(cors())

//importar rotas criando uma constante
const clientesRoute = require("./routes/clientesRoute")
//utilizar o método use para acessar a rota
app.use("/clientes", clientesRoute)

module.exports = app