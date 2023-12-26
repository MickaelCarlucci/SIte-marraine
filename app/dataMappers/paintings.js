const client = require("../../data/database.js");

const painting = {

  async getAllPaintings() {
    return await client.query("SELECT * FROM paintings");
  },

  async getOnePainting(id) {
    return await client.query("SELECT * FROM paintings WHERE id = $1", [id]);
  }
};


module.exports = painting;