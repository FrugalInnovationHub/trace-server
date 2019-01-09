/*
 * Create and export database configuration variables
 */
require('dotenv').config(); // Sets up dotenv as soon as our application starts
const dbConfig = {
  host     : process.env.HOST,
  user     : process.env.DB_USER,
  password : process.env.PASSWORD,
  port : process.env.DB_PORT,
  database : process.env.DATABASE
};

// Export the module
module.exports = dbConfig;
