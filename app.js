const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const notFoundController = require('./controllers/notFound');
const User = require('./models/user');

const app = express();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5e28be82532a6c8d06f5e534')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFoundController.get404);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nodeshop-7k3bh.gcp.mongodb.net/shop?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(uri, options)
  .then(() => {
    User.findOne().then(user => {
      if (!user) {
        const newUser = new User({
          name: 'Matias',
          email: 'matias@test.com',
          cart: [],
        });
        newUser.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => console.log(err));
