const express = require('express');
const cors = require('cors');
const routes = require('./routes');

app.use(cors( /*{origin: '//http:meusite'} */));
const app = express();
//defino que o corpo da requisição sera passdo através de json
app.use(express.json());
app.use(routes);



app.listen(3333) 