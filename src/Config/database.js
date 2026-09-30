const mongoose = require("mongoose");

const connectdb = async () => {
      await mongoose.connect("mongodb+srv://sashang345_db_user:Sashang1234@cluster0.i7cdejy.mongodb.net/devTinder");
};

module.exports = {
    connectdb
}