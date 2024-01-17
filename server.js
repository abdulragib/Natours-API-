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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App Running on Port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION! 🔥 Shutting down..');
  server.close(()=>{
    process.exit(1);
  })
  
});
