// another migration file
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('membership', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.integer('customer_id').notNullable();
        table.integer('vendor_id').notNullable();
        
    })  
};
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('membership')
};
