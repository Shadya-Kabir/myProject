// knexfile.js
module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || { 
    user: 'postgres', // or other user if you made one
    password: 'brainStation123', 
    database: 'finalprojectdb' 
  }
};