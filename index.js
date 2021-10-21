const { request } = require("express")
const express = require("express")
const cors = require('cors')

const porta = 3002
const app = express()
const uuid = require("uuid")
app.use(express.json())
app.use(cors())


const pedidos = []


app.get("/pedidos", (request, response) => {

    return response.json(pedidos)

})


app.post("/pedidos", (request, response) => {
    const { id, order, clientName, price, status } = request.body
    const pedido = { id: uuid.v4(), order, clientName, price, status }

    pedidos.push(pedido)
    return response.status(201).json(pedido)

})

app.put("/pedidos/:id", (request, response) => {
    const { id } = request.params
    const { order, clientName, price, status } = request.body
    const upadetPedidos = { id, order, clientName, price, status }

    const index = pedidos.findIndex(pedido => pedido.id === id)
    if (index < 0) {
        return response.status(404).json({ message: "user not found" })
    }

    pedidos[index] = upadetPedidos

    return response.json(upadetPedidos)

})



app.delete("/pedidos/:id", (request, response) => {
    const { id } = request.params
    const index = pedidos.findIndex(pedido => pedido.id === id)
    if (index < 0) {
        return response.status(404).json({ message: "user not found" })
    }

    pedidos.splice(index,1)

    return response.status(204).json(pedidos)

})

// app.get("/pedidos/:id", (request, response) => {
//     const { id } = request.params
//     const index = pedidos.findIndex(pedido => pedido.id === id)
//     if (index < 0) {
//         return response.status(404).json({ message: "user not found" })
//     }

//     return response.json(pedidos)

// })

app.listen(porta, () => {
    console.log("está rodando")
})


