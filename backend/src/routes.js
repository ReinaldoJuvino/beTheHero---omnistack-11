const express = require('express');
const ongController = require("./controllers/ongController");
const incidentController = require("./controllers/incidentController");
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');
const routes = express.Router();

//list All ongs
routes.get('/ongs',ongController.index);
//create ongs
routes.post('/ongs', ongController.create);

// create incident
routes.get("/incidents",incidentController.index);
//create incident
routes.post('/incidents',incidentController.create);
//delete incident
routes.delete('/incidents/:id',incidentController.delete);
// listando casos expecificos da mesma ong
routes.get('/profile', profileController.index);

//login
routes.post('/login', sessionController.create);
 

module.exports = routes;
