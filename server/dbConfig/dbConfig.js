const mongoose = require("mongoose");

const connect = () => {
  let dbConnection = null;
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("Connected to DB"))
      .catch((error) => console.log("Error Connection to DB: ", error));
  } catch (error) {
    console.log("Error COnnecting to DB:", error);
  }
  return dbConnection;
};

module.exports = connect;
