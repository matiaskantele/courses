const MongoClient = require("mongodb").MongoClient;

const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nodeshop-7k3bh.gcp.mongodb.net/test?retryWrites=true&w=majority`;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(client => {
      console.log("Connected to MongoDB!");
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
