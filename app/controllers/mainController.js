

const mainController = {
    homePage: (request, response) => {

        response.render('home.ejs')
    },

    arrays: (request, response) => {

        response.render('arrays.ejs')
    },

    contact: (request, response) => {

        response.render('contact.ejs')
    },

    array: (request, response) => {

        response.render('array.ejs')
    }

}

module.exports = mainController;