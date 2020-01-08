const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "products.json");

const getProductsFromFile = cb => {
  fs.readFile(p, (err, content) => {
    if (err || content.length === 0) {
      return cb([]);
    }
    cb(JSON.parse(content));
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static fetchAll(cb) {
    return getProductsFromFile(cb);
  }
};
