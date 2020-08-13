const connection = require("../database/connection");

module.exports = {

    async create (request,response) {

        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id',id)
            .select('name')
            .first();
        //caso ong não exista
        if (!ong) {
            return response.status(400).json({error: "nenhuma ong encontrada com esse id"});
        }

        return response.json(ong);
    }

}