const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req, res) => res.send("<h1>Hello World!!</h1>"));

app.listen(3000);
