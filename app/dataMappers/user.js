const client = require("../../data/database.js");

const user = {
  async getUserAndPassword(name, password) {
    return await client.query("SELECT * FROM administrator WHERE name = $1 AND password = $2", [name, password]);
  },

  async signup(username, hashedPassword) {
    const result = await client.query('INSERT INTO administrator (name, password) VALUES ($1, $2)', [username, hashedPassword]); 
    return result;
  }
};

module.exports = user;