require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');
const router = require('./app/router.js');
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views','./app/views');


app.use(express.static('app/integration'));
app.use(express.json());

app.use(session({
  secret: 'dsqdsqdzqsdxc',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use((req, res, next) => {
  // Vérifier si une session est présente dans la requête
  if (req.session && req.session.user) {
    // Extraire les informations de l'utilisateur de la session
    const user = req.session.user;
    // Ajouter l'objet user à la requête pour qu'il soit disponible dans les routes et les vues
    req.user = user;
  }  
  next(); // Appeler la fonction next() pour passer au middleware suivant
});

app.use(router);

app.use((request, response) => {
  response.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
