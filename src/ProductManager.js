const { error } = require("console");
const fs = require("fs");
class ProductManager {
  #products = [];

  //constructor de la clase!
  constructor(ruta) {
    this.path = ruta;
  }

  //Funciones
  async init() {
    try {
      await this.getProducts();
    } catch (error) {
      console.log(error);
    }
  }
  async getProducts() {
    try {
      let resultado = await fs.promises.readFile("./products.txt", "utf-8");
      let arrayProducts = resultado
        .split("\n")
        .filter((linea) => linea.trim() !== "");
      arrayProducts.map((element) => {
        let Objet = JSON.parse(element);
        if (!this.#products.some((producto) => producto.code === Objet.code)) {
          this.#products.push(Objet);
        } else {
          console.log("producto ya enlistado!");
        }
      });
    } catch (error) {
      console.log(error);
    }
    return this.#products;
  }
  async getProductsLimit(number) {
    try {
      let resultado = await fs.promises.readFile("./products.txt", "utf-8");
      let arrayProducts = resultado
        .split("\n")
        .filter((linea) => linea.trim() !== "");
      const selectedProducts = arrayProducts.slice(0, number);
      this.#products = [];
      selectedProducts.forEach((element) => {
        let Objeto = JSON.parse(element);
        if (!this.#products.some((producto) => producto.code === Objeto.code)) {
          this.#products.push(Objeto);
        } else {
          console.log("Producto ya enlistado!");
        }
      });
    } catch (error) {
      console.log(error);
    }
    return this.#products;
  }

  async addProduct(Product) {
    try {
      if (!this.#products.some((producto) => producto.code === Product.code)) {
        const uniqueId = this.#products.length + 1;
        Product.id = uniqueId;
        this.#products.push(Product);
        var productJSON = JSON.stringify(Product) + "\n";
        fs.promises
          .appendFile(this.path, productJSON)
          .then(() => console.log("Producto agregado a la lista"))
          .catch((error) => console.log(error));
      } else {
        console.log("El producto ya está en la lista!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  getProductsByID(idSearch) {
    if (this.#products.some((producto) => producto.id === idSearch)) {
      const producto = this.#products.find(
        (producto) => producto.id === idSearch
      );
      return producto;
    } else console.log("Not found!");
  }

  async updateProduct(id, obj) {
    this.#products = this.#products.map((product) =>
      product.id === id ? obj : product
    );

    await fs.promises.unlink(this.path);
    await fs.promises.writeFile(this.path, "");
    this.#products.forEach((element) => {
      var productjJSON = JSON.stringify(element) + "\n";
      fs.promises
        .appendFile(this.path, productjJSON)
        .then(() => console.log("producto agregado a la lista"))
        .catch((error) => console.log(error));
    });
  }

  async deleteProduct(id) {
    this.#products = this.#products.filter((objeto) => objeto.id !== id);

    await fs.promises.unlink(this.path);
    await fs.promises.writeFile(this.path, "");
    this.#products.forEach((element) => {
      var productjJSON = JSON.stringify(element) + "\n";
      fs.promises
        .appendFile(this.path, productjJSON)
        .then(() => console.log("producto agregado a la lista"))
        .catch((error) => console.log(error));
    });
  }
}

//clase producto !
class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}
const product = new Product(
  "coca",
  "gaseosa sabor naranja",
  1000,
  "foto",
  "abc1234",
  100
);

let productManager = new ProductManager("products.txt");
productManager.addProduct(product);
module.exports = productManager;

const producto = new Product(
  "producto prueba",
  "este producto es un producto prueba",
  200,
  "sin imagen",
  "abc123",
  25
);
const producto1 = new Product(
  "coca",
  "gaseosa sabor naranja",
  1000,
  "foto",
  "abc1234",
  100
);
const producto2 = new Product(
  "sprite",
  "gaseosa sabor cola",
  1000,
  "foto",
  "abc12345",
  100
);
const productoActualizado = new Product(
  "sprite",
  "gaseosa sabor lima",
  9999,
  "foto",
  "abc12345",
  45666
);

const manager = new ProductManager("products.txt");

async function main() {
  try {
    await manager.init();
    console.log("Productos existentes:", await manager.getProducts());
    await manager.addProduct(producto);
    console.log("Productos existentes:", await manager.getProducts());
    console.log("buscando por ID");
    console.log(manager.getProductsByID(1));
    // console.log("Update de producto");
    // manager.updateProduct(1, productoActualizado);
    // console.log("Productos existentes:", await manager.getProducts());
    // console.log("eliminacion de producto");
    // manager.deleteProduct(2);
    // console.log("Productos existentes:", await manager.getProducts());
  } catch (error) {
    console.log(error);
  }
}

main();
