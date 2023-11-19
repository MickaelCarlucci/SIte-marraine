const arrays = require('../../tableaux.json')

const mainController = {
    homePage: (request, response) => {

        response.render('home.ejs')
    },

    arrays: (request, response) => {
        const allArrays = arrays;

            console.log(allArrays)
        

        response.render('arrays.ejs', {allArrays})
    },

    contact: (request, response) => {
        

        response.render('contact.ejs')
    },

    array: (request, response) => {
        
        response.render('array.ejs')
    }

}

module.exports = mainController;