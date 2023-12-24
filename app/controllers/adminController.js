const fs = require('fs');
const messages = require('../../messages.json');

const adminController = {
  admin: (request, response) => {
    const formData = request.body;
    console.log(formData);

    //Charger les données existantes depuis le fichier JSON
    const jsonData = JSON.parse(fs.readFileSync('messages.json', 'utf-8'));

    // Ajouter les nouvelles données du formulaire à la liste d'entrées
    jsonData.entries.push(formData);

    // Enregistrer les données mises à jour dans le fichier JSON
    fs.writeFileSync('messages.json', JSON.stringify(jsonData, null, 2));

    // Rediriger ou rendre une autre page
    response.redirect('/'); // Remplacez '/success' par l'URL de la page de succès*/
    
  },

  adminHome: (request, response) => {

    const messagesObject = messages;
    response.render('adminPage.ejs', { messagesObject });
  },

  adminMail: (request, response) => {
    const messagesObject = messages;

    response.render('adminMessage.ejs', { messagesObject });
  }


};

module.exports = adminController;