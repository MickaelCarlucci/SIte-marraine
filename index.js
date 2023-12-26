require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./app/router.js');
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views','./app/views');

app.use(express.static('app/integration'));

app.use(router);

app.use((request, response) => {
  response.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
