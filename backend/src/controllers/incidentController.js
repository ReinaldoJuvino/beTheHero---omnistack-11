const connection = require("../database/connection");

module.exports = {

    async index(request,response) {
        //query params ?page='numero'
        const { page = 1} =  request.query;

        const [count] = await connection('incidents').count();
        console.log(count);

        const incidents = await connection('incidents')
            //relacionando dados entre tabelas.
    //  !   resgatando da tabela ongs onde o id seja igual a ong_id FK da tabela incidents
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            //restringindo retorno a 5 elementos por vez
            .limit(5)
            //multiplicando page por 5 teremos assim uma paginação simples
            .offset((page -1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
        //informando ´pelo header da resposta o total de campos    
        response.header('x-total-count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request,response){
        const {title,description,value} = request.body;

        const ong_id = request.headers.authorization;

        // o primeiro espaço no array de retorno será o id.
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return response.json({id})
    },
    // ! id === ong_id

    async delete(request, response){
        // coletando o id do usuario que enviou a requisição
        const { id } = request.params;
        // verificando usuario logado
        const ong_id = request.headers.authorization;

        const incident = await connection("incidents")
            // selecionando um "id" no banco que seja igual o id
            .where("id",id)
            .select("ong_id")
            .first();
        
        if (incident.ong_id != ong_id) {
            return response.status(401).json({error: "operation not permited"});
        }

        await connection('incidents').where('id',id).delete();

        return response.status(204).send();
    }
};