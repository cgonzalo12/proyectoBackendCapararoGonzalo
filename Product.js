class Product {
  static idCounter = 1;
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.generateUniqueId();
  }
  static generateUniqueId() {
    const uniqueId = Product.idCounter;
    Product.idCounter += 1; // Incrementa el contador para el próximo identificador
    return uniqueId;
  }
}
module.exports = Product;
