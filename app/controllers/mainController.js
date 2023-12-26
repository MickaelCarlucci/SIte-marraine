const paintingMapper = require("../dataMappers/paintings");

const mainController = {

  // Page d'accueil avec 2 tableaux qui se mettent aléatoirement
  homePage: async (request, response) => {
    try {
      // Récupère tous les tableaux depuis la base de données
      const allArrays = await paintingMapper.getAllPaintings();
      // Extracte les données des tableaux de la réponse SQL
      const arrays = allArrays.rows;

      // Filtre et map les tableaux qui ont une URL d'image et un ID
      const urlArrays = allArrays.rows.filter(array => array.url_img && array.id)
        .map(array => ({ url_img: array.url_img, id: array.id }));

      // Déclaration de la fonction pour obtenir une URL aléatoire
      // eslint-disable-next-line no-inner-declarations
      function getRandomUrl() {
        // Génère un index aléatoire
        const randomIndex = Math.floor(Math.random() * urlArrays.length);
        // Retourne l'URL correspondante à l'index aléatoire
        return urlArrays[randomIndex];
      }

      // Appel de la fonction pour obtenir une URL aléatoire
      const randomUrl = getRandomUrl();

      // Rend la vue 'home.ejs' avec les données nécessaires
      response.render('home.ejs', { randomUrl, arrays });
    } catch (error) {
      console.log(error);
    }
  },

  // Page qui affiche un tableau en particulier
  array: async (request, response) => {
    try {
    // On récupère l'ID depuis la requête
      const id = Number(request.params.id);
      // On récupère le tableau correspondant à l'ID depuis la base de données
      /*const array = await paintingMapper.getOnePainting(id);
    const oneArray = array.rows;*/
      const { rows: oneArray } = await paintingMapper.getOnePainting(id);
 
      // Rend la vue 'array.ejs' avec les données nécessaires
      response.render('array.ejs', { oneArray });
    }catch(error){
      console.log(error);
    }
  } 
}; 

// Exporte le contrôleur principal
module.exports = mainController;
