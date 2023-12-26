const message = require("../dataMappers/messages");

const adminController = {
  admin: async (request, response) => {
    const formData = request.body;
    try {
      const count = await message.addMessageForArtist(formData);
      if (count === 1) {
        response.redirect('/'); 
      } else {
        return response.status(500).send("Le message n'a pas pu être envoyé car le serveur ne répond pas");
      }
    }catch(error){
      console.log(error);
    }
    
  },

  adminHome: async (request, response) => {
    try {
      const {rows: messagesObject} = await message.allMessages();
      response.render('adminPage.ejs', { messagesObject });

    } catch(error) {
      console.log(error);
    }
  },

  delete: async (request, response) => {
    try{
      const id = Number(request.params.id);
      await message.deleteMessage(id);
      response.redirect("/robert");

    } catch (error) {
      console.log(error);
    }
  },

  deleteSelectedMessages: async (request, response) => {
    try {
      const selectedMessages = request.body.selectedMessages;
  
      if (!selectedMessages || !Array.isArray(selectedMessages)) {
        return response.status(400).send("Aucun message sélectionné");
      }
  
      // Convertir les ID en nombres
      const numericIds = selectedMessages.map(id => parseInt(id));
  
      // Vérifier si la conversion a réussi
      if (numericIds.some(isNaN)) {
        return response.status(400).send("ID de message invalide");
      }
  
      // Supprimer les messages avec les ID convertis
      await Promise.all(numericIds.map(async (id) => {
        await message.deleteMessage(id);
      }));
  
      response.redirect("/robert");
    } catch (error) {
      console.error(error);
      response.status(500).send("Erreur interne du serveur");
    }
  },
  

  adminMail: async (request, response) => {
    try {
      const {rows: messagesObject} = await message.allMessages();
      response.render('adminPage.ejs', { messagesObject });

    } catch(error) {
      console.log(error);
    }
  }


};

module.exports = adminController;