//chamar o express para acessar o método Router
const express = require("express")
//chamar o controller
const controller = require("../controllers/clientesController")
//criar uma váriavel para o routes
const routes = express.Router()

//criar as rotas
//rota para listar todos os clientes (GET)
routes.get("/todos", controller.allClients)
//rota para listar por id (GET)
routes.get("/filtrar/:id", controller.findById)
//rota para listar por nome, se tiver nome social, trazer por nome social (GET)
routes.get("/filtrarNome", controller.findByName)
//rota para cadastrar clientes (POST)
routes.post("/cadastrar", controller.registerClient)

module.exports = routes