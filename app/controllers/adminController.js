const adminController = {
  admin: (request, response) => {
    
    response.render('adminPage.ejs');
  },

  adminMail: (request, response) => {

    response.render('adminMessage.ejs');
  }


};

module.exports = adminController;