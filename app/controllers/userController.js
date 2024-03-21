const bcrypt = require('bcrypt');
const userDataMapper = require("../dataMappers/user.js");

const userController = { 
  //Controller pour trouver la page d'inscription (désactivé car un seul utilisateur)
  getSignupPage: async (request, response) => {
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
      await userDataMapper.signup(username, hashedPassword);
      response.send("Inscription réussie !");


    }catch(error) {
      console.log(error);
    }       
  },

  login: async (request, response) => {
    try {
      const {adminName, password } = request.body;
      const userRegister  = await userDataMapper.getUserAndPassword(adminName, password);
  
      if(userRegister.rows[0].name !== adminName) {
        return response.status(401).send('Utilisateur non trouvé');
      }
      const storedPassword = userRegister.rows[0].password;
      const passwordCompare = await bcrypt.compare(password, storedPassword);
      
      if(passwordCompare) {
        request.session.user = userRegister.rows[0];        
        response.redirect('/robert');
      } else {
        response.status(401).send('mot de passe incorrect');
      }      

    }catch(error) {
      console.log(error);
    }       
  },


  logout: async (request, response) => {

    try {
      request.session.user = request.session.destroy();
      response.redirect('/robert');
    }catch(error) {
      console.log(error);
    }       
  }
};

module.exports = userController;