
// another migration file
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('vendors', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('fullName').notNullable();
        table.string('email').notNullable();
        table.string('ph');
        table.string('address');
        table.string('vendorType');
        table.string('role');
        table.boolean('registered');
        table.string('user_id');
        table.string('password');
    })  
};
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('vendors')
};
