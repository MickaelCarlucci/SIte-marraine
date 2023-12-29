const message = require("../dataMappers/messages");

// Contrôleur pour les fonctionnalités administratives
const adminController = {

  // Gère l'ajout d'un message par un artiste
  admin: async (request, response) => {
    const formData = request.body;
    try {
      // Ajoute le message en utilisant le mapper de données
      const count = await message.addMessageForArtist(formData);
      // Redirige vers la page d'accueil si l'ajout est réussi
      if (count === 1) {
        response.redirect('/');
      } else {
        // En cas d'échec, renvoie une erreur 500
        return response.status(500).send("Le message n'a pas pu être envoyé car le serveur ne répond pas");
      }
    } catch (error) {
      // Gère les erreurs en les affichant dans la console
      console.log(error);
    }
  },

  // Affiche la page d'administration avec tous les messages
  adminHome: async (request, response) => {
    try {
      // Récupère tous les messages à afficher
      const {rows: messagesObject} = await message.allMessages();
      // Rend la page d'administration avec les messages
      response.render('adminPage.ejs', { messagesObject });
    } catch (error) {
      // Gère les erreurs en les affichant dans la console
      console.log(error);
    }
  },

  // Supprime un message spécifié par son ID
  delete: async (request, response) => {
    try {
      // Récupère l'ID du message à supprimer
      const id = Number(request.params.id);
      // Supprime le message en utilisant le mapper de données
      await message.deleteMessage(id);
      // Redirige vers une page spécifique après la suppression
      response.redirect("/robert");
    } catch (error) {
      // Gère les erreurs en les affichant dans la console
      console.log(error);
    }
  },

  // Supprime plusieurs messages sélectionnés
  deleteSelectedMessages: async (request, response) => {
    try {
      // Récupère les messages sélectionnés depuis le corps de la requête
      const selectedMessages = request.body.selectedMessages;
  
      if (!selectedMessages || !Array.isArray(selectedMessages)) {
        // Vérifie si les messages sélectionnés sont valides, sinon renvoie une erreur 400
        return response.status(400).send("Aucun message sélectionné");
      }
  
      // Convertit les ID en nombres
      const numericIds = selectedMessages.map(id => parseInt(id));
  
      // Vérifie si la conversion a réussi
      if (numericIds.some(isNaN)) {
        // Renvoie une erreur 400 si certains ID ne sont pas valides
        return response.status(400).send("ID de message invalide");
      }
  
      // Supprime les messages avec les ID convertis
      await Promise.all(numericIds.map(async (id) => {
        await message.deleteMessage(id);
      }));
  
      // Redirige vers une page spécifique après la suppression
      response.redirect("/robert");
    } catch (error) {
      // Gère les erreurs en les affichant dans la console
      console.error(error);
      // Renvoie une erreur 500 en cas d'erreur interne du serveur
      response.status(500).send("Erreur interne du serveur");
    }
  },
  
  // Affiche la page d'administration avec tous les messages (identique à adminHome ?)
  adminMail: async (request, response) => {
    try {
      // Récupère tous les messages à afficher
      const {rows: messagesObject} = await message.allMessages();
      // Rend la page d'administration avec les messages
      response.render('adminPage.ejs', { messagesObject });
    } catch (error) {
      // Gère les erreurs en les affichant dans la console
      console.log(error);
    }
  }
};

// Exporte le contrôleur administratif pour une utilisation externe
module.exports = adminController;