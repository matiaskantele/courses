const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/db");
const Product = require("./models/product");
const User = require("./models/user");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const notFoundController = require("./controllers/notFound");

const app = express();

app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(notFoundController.get404);

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);

sequelize
  // .sync({ force: true })
  .sync()
  .then(res => {
    return User.findByPk(1);
    // console.log(res);
  })
  .then(user => {
    // Create user if one doesn't exist
    if (!user) {
      return User.create({ name: "Matias", email: "test@test.com" });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    app.listen(3000);
  })
  .catch(err => console.log(err));
