const ProductManager = require("./ProductManager");

const express = require("express");
const app = express();
app.get("/ping", (req, res) => {
  res.send("pong");
});
//lista todos los productos
app.get("/products", async (req, res) => {
  //entrada : req
  //nada porque no mandan ningun dato
  //llamado a product manager
  let produts = await ProductManager.getProducts();
  //salida: res
  res.send(produts);
});
//miestra el producto por el Id
app.get("/products/:id", async (req, res) => {
  //entrada : req
  let id = req.params.id;
  //nada porque no mandan ningun dato
  //llamado a product manager
  let produt = await ProductManager.addProduct(id);
  //salida: res
  res.send(produt);
});

app.listen(3000, () => {
  console.log("aplicacion funcionanado el el puerto 3000");
});
