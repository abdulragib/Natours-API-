const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
  console.log('DB Connection Sucessful!');
});

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'A tour must have name'],
    unique:true
  },
  rating:{
    type:Number,
    default:4.5,
  },
  price: {
    type:Number,
    required:[true, 'A tour must have price'],
  },
});

const Tour=mongoose.model('Tour',tourSchema);
console.log(Tour)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App Running on Port ${port}...`);
});
