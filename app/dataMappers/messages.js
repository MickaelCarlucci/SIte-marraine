const client = require("../../data/database.js");

const message = {
  async allMessages () {
    return await client.query("SELECT * FROM messages");
  },


  async addMessageForArtist (formdata){
    const {lastname, firstname, mail, message} = formdata;
    const SQLquery = {
      text: `
            INSERT INTO messages
            (lastname, firstname, mail, message)
            VALUES
            ($1, $2, $3, $4);
            `, 
      values: [lastname, firstname, mail, message],
    };
    const result = await client.query(SQLquery);
    console.log(result.rowCount);
    return result.rowCount;
  },

  async getOneMessage (id) {
    return await client.query("SELECT * FROM messages WHERE id = $1", [id]);
  },

  async deleteMessage(id) {
    return await client.query("DELETE * FROM messages WHERE id = $1", [id]);
  }
  
};

module.exports = message;