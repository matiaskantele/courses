const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/db");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const notFoundController = require("./controllers/notFound");

const app = express();

app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(notFoundController.get404);

sequelize
  .sync()
  .then(res => {
    // console.log(res);
    app.listen(3000);
  })
  .catch(err => console.log(err));
