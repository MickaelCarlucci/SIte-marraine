require('dotenv').config();

const express = require('express');
const session = require('express-session');
const requestIp = require('request-ip');
const bodyParser = require('body-parser');
const router = require('./app/router.js');


const app = express();
const PORT = process.env.PORT;


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views','./app/views');

app.use(requestIp.mw());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('app/integration', {
  maxAge: '30d' // 30 jours
}));
app.use(express.json());

app.use(session({
  secret: 'dsqdsqdzqsdxcdsqzdJJ12685KIEnbieH',
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

app.locals.RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;
app.use(router);

app.use((request, response) => {
  response.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
