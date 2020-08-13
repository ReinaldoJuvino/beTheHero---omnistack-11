
const knex = require('knex');
const configuration = require("../../knexfile");

// const knex = require('knex');

//configuration.development são as comfigurações definidas no arquivo knexFile
const connection = knex(configuration.development);

module.exports = connection;