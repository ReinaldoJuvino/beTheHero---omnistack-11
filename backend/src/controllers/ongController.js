const connection = require("../database/connection")
// Utilizada para criptografia
const crypto = require('crypto');



module.exports = {
    //List-all
    async index(request,response) {

        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
       
    },

    async create(request,response) {

        // pegando o corpo da requisição
        const {name, email,whatsapp,city,uf} = request.body;

        // Gerando o id de forma aleatoria 
        const id = crypto.randomBytes(4).toString("HEX");


        await connection ("ongs").insert({

            id, 
            name,
            email,
            whatsapp,
            city,
            uf,

        })
        
        return response.json({id});
    }
};