const express = require("express");
const { randomUUID } = require("crypto")
const app = express();
const fs = require("fs");

app.use(express.json())


let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    }else {
        products = JSON.parse(data);
    }
});

/**
 * POST => Inserir um dado
 * GET => Buscar um/mais dados
 * PUT => Alterar um dado
 * DELETE => Remover um dado
 */

/**
 * Body => Sempre que eu quiser enviar dados para minha aplicação 
 * Params => /product/1564655484651546513 - parametro de rota 
 * Query => /product?id=13311513651131value=4651245154
 */



app.post("/products", (request, response) => {
    // Nome e preço = Name e Price

    const {name, price} = request.body;

    const product = {
        name,
        price,
        id: randomUUID(),
    }

    products.push(product);

    crateProductFile()

    return response.json(product);
});

app.get("/products", (request, response) =>{
    return response.json(products)
});

app.get("/products/:id", (request, response) =>{
    const {id} = request.params;
    const product = products.find(product => product.id === id);
    return response.json(product);
})


app.put("/products/:id", (request, response) =>{
    const { id } = request.params;
    const { name, price } = request.body;

    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name, 
        price
    };

    crateProductFile

    return response.json({ message: "Produto alterado com sucesso"});
});

app.delete("/products/:id", (request, response) => {
    const { id } = request.params;
    
    const productIndex = products.findIndex(product => product.id === id);

    products.splice(productIndex, 1);

    return response.json({ message: "Produto removido com sucesso!"});

});

function crateProductFile() {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        }else {
            products = JSON.parse(data);
        }
    });
};

app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));
