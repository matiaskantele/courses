const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch previous cart
    fs.readFile(p, (err, content) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(content);
      }
      // Analyze cart => Find existing product
      const existingProductIndex = cart.products.findIndex(p => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product / increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => console.log(err));
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, content) => {
      if (err) {
        console.log(err);
        return;
      }
      const updatedCart = { ...JSON.parse(content) };
      const product = updatedCart.products.find(p => p.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(p => p.id !== id);
      updatedCart.totalPrice -= productPrice * productQty;
      fs.writeFile(p, JSON.stringify(updatedCart), err => console.log(err));
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, content) => {
      const cart = JSON.parse(content);
      if (err) {
        cb(null);
      }
      cb(cart);
    });
  }
};
