const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = require('./app');



const DB = process.env.MONGO_URI.replace('<PASSWORD>', process.env.MONGO_PASSWORD);
mongoose.connect(DB, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
}).then(con => console.log('Database connected successfully!'));



const PORT = process.env.PORT || 2021;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})