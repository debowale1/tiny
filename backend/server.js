const {connectDB} = require('./utils/connectDB')
const app = require('./app');
//connect to mongodb
connectDB()

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})