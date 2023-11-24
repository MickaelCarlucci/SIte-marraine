const arrays = require('../../tableaux.json')

const mainController = {

    //page d'accueil avec 2 tableaux qui se mettent aléatoirement
    homePage: (request, response) => {
        //fait un tableau d'url a partir du fichier json
        const urlArrays = arrays.map(array => array.url_img);
       // fonction pour generer des url aléatoire pour afficher des images dans la view
        function getRandomUrl() {
            const randomIndex = Math.floor(Math.random() * urlArrays.length);
            return urlArrays[randomIndex];
        }
            // crée une premiere variable qui exploite la fonction et l'envoie a la view pour exploiter sur une seconde variable
            const randomUrl = getRandomUrl();
            
    
        response.render('home.ejs', { randomUrl,  getRandomUrl });
    },
    
    

    //page de tous les tableaux avec boucle dans la page ejs a partir du json
    arrays: (request, response) => {
        // récupere le tableau d'objet du fichier json
        const allArrays = arrays;  

        response.render('arrays.ejs', { allArrays })
    },

    contact: (request, response) => {
        

        response.render('contact.ejs')
    },

    //page qui affiche un tableau
    array: (request, response) => {
        //on récupère l'id de la page
        const id = Number(request.params.id);
        // on l'envoie sur l'array qui correspond et on récupere le tableau
        const oneArray = arrays.find((array) => array.id === id)
        console.log(oneArray)
        response.render('array.ejs', { oneArray })
    }
}

module.exports = mainController;