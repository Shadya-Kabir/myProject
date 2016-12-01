
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('vendors').del()
    .then(function () {
      return Promise.all([
        knex('vendors').insert({id: 1, fullName: 'fakeName1',email:'fakeVendor@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',vendorType:null, role:null,registered:'false',user_id:'test',password:'test'}),
        knex('vendors').insert({id: 2, fullName: 'fakeName2',email:'fakeVendor@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',vendorType:null, role:null,registered:'false',user_id:'test',password:'test'}),
        knex('vendors').insert({id: 3, fullName: 'fakeName3',email:'fakeVendor@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',vendorType:null, role:null,registered:'false',user_id:'test',password:'test'}),
        knex('vendors').insert({id: 4, fullName: 'fakeName4',email:'fakeVendor@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',vendorType:null, role:null,registered:'false',user_id:'test',password:'test'}),
        knex('vendors').insert({id: 5, fullName: 'fakeName5',email:'fakeVendor@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',vendorType:null, role:null,registered:'false',user_id:'test',password:'test'}),
        knex('vendors').insert({id: 6, fullName: 'fakeName6',email:'fakeVendor@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',vendorType:null, role:null,registered:'false',user_id:'test',password:'test'}),
        knex('vendors').insert({id: 7, fullName: 'fakeName7',email:'fakeVendor@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',vendorType:null, role:null,registered:'false',user_id:'test',password:'test'}),
        knex('vendors').insert({id: 8, fullName: 'fakeName8',email:'fakeVendor@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',vendorType:null, role:null,registered:'false',user_id:'test',password:'test'}),
        knex('vendors').insert({id: 9, fullName: 'fakeName9',email:'fakeVendor@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',vendorType:null, role:null,registered:'false',user_id:'test',password:'test'}),
        knex('vendors').insert({id: 10, fullName: 'fakeName10',email:'fakeVendor@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',vendorType:null, role:null,registered:'false',user_id:'test',password:'test'}),
        knex('vendors').insert({id: 11, fullName: 'fakeName11',email:'fakeVendor@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',vendorType:null, role:null,registered:'false',user_id:'test',password:'test'}),
        knex('vendors').insert({id: 12, fullName: 'fakeName12',email:'fakeVendor@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',vendorType:null, role:null,registered:'false',user_id:'test',password:'test'})
      
      ]);
    });
};
