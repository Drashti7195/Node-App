const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  dbUrl: process.env.DATABRASE_URL,
  enviorment: process.env.NODE_ENV,
  port: process.env.PORT
};