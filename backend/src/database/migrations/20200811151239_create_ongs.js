// Responsavel pela criação da tabela
exports.up = function(knex) {
  return knex.schema.createTable("ongs",function(table){
      table.string("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("whatsapp").notNullable();
      table.string("city").notNullable();
    //   ao passar um segundo parametro o mesmo define o tamanho do campo
      table.string("uf",2).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("ongs");
};