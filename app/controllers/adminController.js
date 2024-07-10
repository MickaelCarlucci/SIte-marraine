const message = require("../dataMappers/messages");
const painting = require("../dataMappers/paintings");
const rateLimit = require('express-rate-limit');
const axios = require('axios');

const MAX_MESSAGES = 5;

// Middleware to limit requests by IP
const messageLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 heures
  max: MAX_MESSAGES, // Limite pour chaque ip un envoie de 5 messages toute les 24h
  handler: (request, response) => {
    response.status(429).send("Vous avez atteint la limite d'envoi de messages pour 24h.");
  }
});





// Contrôleur pour les fonctionnalités administratives
const adminController = {

  // Gère l'ajout d'un message par un utilisateur
  admin: [messageLimiter, async (req, res) => {
    const formData = req.body;

    const recaptchaToken = formData['g-recaptcha-response'];
    const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

    try {
      const verificationResponse = await axios.post(verificationUrl, null, {
        params: {
          secret: recaptchaSecret,
          response: recaptchaToken
        }
      });

      if (verificationResponse.data.success && verificationResponse.data.score >= 0.5) {
        const count = await message.addMessageForArtist(formData);
        if (count === 1) {
          res.redirect('/');
        } else {
          res.status(500).send('Le message n\'a pas pu être envoyé car le serveur ne répond pas');
        }
      } else {
        res.status(400).send('Captcha non vérifié');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Erreur lors de la vérification du captcha');
    }
  }],


  //affiche la page admin
  adminHome: async (request, response) => {
    try {
      // Initialise un user dans la session quand on arrive sur la page pour la première fois
      if (!request.session.user) {
        request.session.user = null;
      }
  
      // Récupère tous les messages à afficher
      const { rows: messagesObject } = await message.allMessages();
  
      // Rend la page d'administration avec les messages
      response.render('adminPage.ejs', { user: request.session.user, messagesObject });
    } catch (error) {
      // Gère les erreurs en les affichant dans la console
      console.log(error);
    }
  },

  adminOneMessage: async (request, response) => {
    try {
      const id = Number(request.params.id);
      const oneMessage = await message.getOneMessage(id);
      response.render('adminMessage.ejs', {oneMessage: oneMessage.rows[0]});
    }catch(error) {
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

  // Supprime plusieurs messages sélectionnés : controller a revoir, non fonctionnel
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

  arrayUpdatedTitle: async(request, response) => {
    try {
      // Récupère l'ID du tableau à modifier
      const id = Number(request.params.id);
      // On récupère le changement
      const {title} = request.body;
      // met a jour la description dans la base de donnée
      await painting.updateTitle(title, id);
      // Redirige vers une page spécifique après la suppression
      response.redirect("/#tableaux");
    } catch (error) {
      // Gère les erreurs en les affichant dans la console
      console.log(error);
    }
  },
  
  arrayUpdatedDesc: async(request, response) => {
    try {
      // Récupère l'ID du tableau à modifier
      const id = Number(request.params.id);
      // On récupère le changement
      const {description} = request.body;
      // met a jour la description dans la base de donnée
      await painting.updateDesc(description, id);
      // Redirige vers une page spécifique après la suppression
      response.redirect("/#tableaux");
    } catch (error) {
      // Gère les erreurs en les affichant dans la console
      console.log(error);
    }
  },

  arrayUpdatedPrice: async(request, response) => {
    try {
      // Récupère l'ID du tableau à modifier
      const id = Number(request.params.id);
      // On récupère le changement
      const {price} = request.body;
      // met a jour la description dans la base de donnée
      await painting.updatePrice(price, id);
      // Redirige vers une page spécifique après la suppression
      response.redirect("/#tableaux");
    } catch (error) {
      // Gère les erreurs en les affichant dans la console
      console.log(error);
    }
  }

};

// Exporte le contrôleur administratif pour une utilisation externe
module.exports = adminController;