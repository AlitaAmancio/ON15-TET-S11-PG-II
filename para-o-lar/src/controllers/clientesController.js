//importar o json
const clientes = require("../models/clientesModels.json")

//listar todos os clientes (GET)
const allClients = (request, response) => {
    response.status(200).json({
        "mensagem": "Seguem os clientes cadastrados em nosso sistema:",
        clientes
    })
}
//listar clientes por id (GET)
const findById = (request, response) => {
    try {
        //identificar o id do parametro
        const chamarId = request.params.id
        //entrar no banco de dados achando o id no banco e comparando com o id digitado
        const findId = clientes.find(cliente => cliente.clienteId == chamarId)
        if(!findId) {
            throw new Error("Não encontramos cliente com esse Id") 
        }
        response.status(200).json(findId)
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
//listar por nome, caso houver nome social, trazer o nome social (GET)
const findByName = (request, response) => {
    try {
        const trazerNome = request.query.nome.toLowerCase()
        const findName = clientes.filter(cliente => {
            if(cliente.nomeSocial) {
                return cliente.nomeSocial.toLowerCase().includes(trazerNome)
            }

           return cliente.nome.toLowerCase().includes(trazerNome)
        })

        if(findName.length == 0) {
            throw new Error("Nome não encontrado.")
        }

        response.status(200).json({
            "mensagem": "Cliente encontrado:",
            findName
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
//cadastrar no sistema um cliente (POST)
const registerClient = (request, response) => {
    try {
        const getBody = request.body
        let newClient = {
            clienteId: (clientes.length) + 1,
            nome: getBody.nome,
            nomeSocial: getBody.nomeSocial,
            idade: getBody.idade,
            endereco: getBody.endereco,
            telefone: getBody.telefone,
            cpf: getBody.cpf
        }

        clientes.push(newClient)

        response.status(201).json({
            "mensagem": "Cliente cadastrado com sucesso.",
            newClient
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
//atualizar o cadastro de um cliente no sistema (PUT)
const updateClient = (request, response) => {
    try {
        const getId = request.params.id
        const getBody = request.body


        const clientFound = clientes.find(cliente => cliente.clienteId == getId)

        const index = clientes.indexOf(clientFound)
       
        getBody.clienteId == getId

        clientes.splice(index, 1, getBody)

        if(clientFound == undefined) {
            throw new Error("Cliente não encontrado, pois o id não foi identificado.")
        }

        response.status(200).json({
            "mensagem": "Dados do cliente atualizados com sucesso.",
            getBody
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}
//deletar o cadastro de um cliente (DELETE)
const deleteClient = (request, response) => {
    try {
        const getId = request.params.id
        const clientFound = clientes.find(cliente => cliente.clienteId == getId)

        const index = clientes.indexOf(clientFound)

        clientes.splice(index, 1)

        if(clientFound == undefined) {
            throw new Error("Id não encontrado.")
        }

        response.status(200).json({
            "mensagem": "Cliente excluido com sucesso."
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}







module.exports = {
    allClients,
    findById,
    findByName,
    registerClient,
    updateClient,
    deleteClient
}