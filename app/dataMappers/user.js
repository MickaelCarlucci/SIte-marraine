const client = require("../../data/database.js");

const user = {
  async getUserAndPassword(name) {
    return await client.query("SELECT * FROM administrator WHERE name = $1", [name]);
  },

  async signup(username, hashedPassword) {
    const result = await client.query('INSERT INTO administrator (name, password) VALUES ($1, $2)', [username, hashedPassword]); 
    return result;
  }
};

module.exports = user;