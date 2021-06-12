const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Post = require('./../models/postModel')


dotenv.config();
URI = process.env.MONGO_URI.replace('<PASSWORD>', process.env.MONGO_PASSWORD); 
mongoose.connect(URI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(con => console.log(con.host));

const posts = JSON.parse(fs.readFileSync(`${__dirname}/data/posts.json`, 'utf-8'));


const importData = async () => {
  try {
    await Post.create(posts)
    console.log('data loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
}

const deleteData = async () => {
  try {
    await Post.deleteMany()
    console.log('data deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
}

if(process.argv[2] === '--import'){
  importData();
}
if(process.argv[2] === '--delete'){
  deleteData()
}


