const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DB = process.env.MONGO_URI.replace('<PASSWORD>', process.env.MONGO_PASSWORD);

const connectDB = () => {
  mongoose.connect(DB, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  }).then(con => console.log(`Database connected to ${con.connection.host}`));

}

const disconnectDB = async () => {
  await mongoose.disconnect()
}

module.exports = {
  connectDB,
  disconnectDB
}