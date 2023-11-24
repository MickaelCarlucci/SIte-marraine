const arrays = require('../../tableaux.json')

const mainController = {

    //page d'accueil avec 2 tableaux qui se mettent aléatoirement TODO 
    homePage: (request, response) => {
        const urlArrays = arrays.map(array => array.url_img);
       // const randomUrl = urlArrays[Math.floor(Math.random() * urlArrays.length)];
    
        function getRandomUrl() {
            const randomIndex = Math.floor(Math.random() * urlArrays.length);
            return urlArrays[randomIndex];
        }
    
            const randomUrl = getRandomUrl();
            
    
        response.render('home.ejs', { randomUrl,  getRandomUrl });
    },
    
    

    //page de tous les tableaux avec boucle dans la page ejs a partir du json
    arrays: (request, response) => {
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
        response.render('array.ejs', {oneArray})
    }

}

module.exports = mainController;