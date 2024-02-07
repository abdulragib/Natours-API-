const mongoose = require('mongoose');
const dotenv = require('dotenv');
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 🔥 Shutting down..');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const connectDB = async () => {
  await mongoose.connect(DB).then((con) => {
    // console.log(con.connections);
    console.log('DB Connection Sucessful!');
  });
};

connectDB();

console.log(process.env)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App Running on Port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! 🔥 Shutting down..');
  console.log(err.name, err.message);
});
