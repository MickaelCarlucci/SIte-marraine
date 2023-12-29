const bcrypt = require('bcrypt');
const user = require("../dataMappers/user.js");

const userController = { 
  //Controller pour trouver la page d'inscription (désactivé car un seul utilisateur)
  /*getSignupPage: async (request, response) => {
    try {

      response.render('signup.ejs');

    }catch(error) {
      console.log(error);
    }  
  },

    //controller pour gérer le formulaire d'inscription avec bcrypt
  signup: async (request, response) => {
    try {
      const {username, firstPassword, confirmPassword} = request.body;
      if (firstPassword !== confirmPassword) {
        return response.status(400).send('les mots de passe ne correspondent pas');
      }
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);

      const hashedPassword = await bcrypt.hash(firstPassword, salt);
      await user.signup(username, hashedPassword);
      response.send("Inscription réussie !");


    }catch(error) {
      console.log(error);
    }       
  },*/

  login: async (request, response) => {
    try {


    }catch(error) {
      console.log(error);
    }       
  },

  logout: async (request, response) => {

    try {


    }catch(error) {
      console.log(error);
    }       
  }
};

module.exports = userController;