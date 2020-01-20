const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nodeshop-7k3bh.gcp.mongodb.net/test?retryWrites=true&w=majority`;

const mongoConnect = callback => {
  MongoClient.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(client => {
      console.log("Connected to MongoDB!");
      callback(client);
    })
    .catch(err => console.log(err));
};

module.exports = mongoConnect;
