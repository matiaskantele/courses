const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

// const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");

const notFoundController = require("./controllers/notFound");
const mongoConnect = require("./util/db");

const app = express();

app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then(user => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch(err => console.log(err));
});

// app.use("/admin", adminRoutes);
// app.use(shopRoutes);

app.use(notFoundController.get404);

mongoConnect(client => {
  app.listen(3000);
});
