require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./app/router.js');
const path = require('path');
const PORT = process.env.PORT


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('integration'));

app.use(router);

app.use((request, response) => {
    response.status(404).render("404")
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
