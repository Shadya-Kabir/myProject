
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('membership').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('membership').insert({id: 1, customer_id:1, vendor_id:1}),
        knex('membership').insert({id: 2, customer_id:2, vendor_id:1}),
        knex('membership').insert({id: 3, customer_id:3, vendor_id:1}),
        knex('membership').insert({id: 4, customer_id:4, vendor_id:2}),
        knex('membership').insert({id: 5, customer_id:5, vendor_id:2}),
        knex('membership').insert({id: 6, customer_id:6, vendor_id:2}),
        knex('membership').insert({id: 7, customer_id:7, vendor_id:3}),
        knex('membership').insert({id: 8, customer_id:8, vendor_id:3}),
        knex('membership').insert({id: 9, customer_id:9, vendor_id:4}),
        knex('membership').insert({id: 10, customer_id:10, vendor_id:4})
      ]);
    });
};
