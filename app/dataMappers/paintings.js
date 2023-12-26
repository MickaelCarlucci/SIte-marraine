const client = require("../../data/database.js");

const painting = {

  async getAllPaintings() {
    return await client.query("SELECT * FROM paintings");
  }
};


module.exports = painting;