const client = require("../../data/database.js");

const painting = {

  async getAllPaintings() {
    return await client.query("SELECT * FROM paintings ORDER BY id ");
  },

  async getOnePainting(id) {
    return await client.query("SELECT * FROM paintings WHERE id = $1", [id]);
  },

  async updateDesc(description, id) {
    return await client.query(`UPDATE "paintings"
                              SET "description" = $1
                              WHERE "id" = $2`, [description, id]);
  }
};


module.exports = painting;