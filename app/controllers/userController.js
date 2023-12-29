const bcrypt = require('bcrypt');
const user = require("../dataMappers/user.js");

const userController = { 
  getSignupPage: async (request, response) => {
    try {

      response.render('signup.ejs');

    }catch(error) {
      console.log(error);
    }  
  },

  signup: async (request, response) => {
    try {
      const {username, firstPassword, confirmPassword} = request.body;
      if (firstPassword !== confirmPassword) {
        return response.status(400).send('les mots de passe ne correspondent pas');
      }

      const hashedPassword = await bcrypt.hash(firstPassword, 10);
      await user.signup(username, hashedPassword);
      response.send("Inscription réussie !");


    }catch(error) {
      console.log(error);
    }       
  },

  getLoginPage: async (request, response) => {

    try {
      response.render('robert.ejs');

    }catch(error) {
      console.log(error);
    }       
  },

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