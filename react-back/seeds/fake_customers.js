
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('customers').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('customers').insert({fullName: 'fakeName1',dateOfBirth:'6/15/1980',email:'fakeuser@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',visitHistory:null,registered:'false',user_id:'test',password:'test'}),
        knex('customers').insert({fullName: 'fakeName2',dateOfBirth:'5/16/1989',email:'fakeuser@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',visitHistory:null,registered:'false',user_id:'test',password:'test'}),
        knex('customers').insert({fullName: 'fakeName3',dateOfBirth:'4/17/1988',email:'fakeuser@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',visitHistory:null,registered:'false',user_id:'test',password:'test'}),
        knex('customers').insert({fullName: 'fakeName4',dateOfBirth:'3/18/1987',email:'fakeuser@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',visitHistory:null,registered:'false',user_id:'test',password:'test'}),
        knex('customers').insert({fullName: 'fakeName5',dateOfBirth:'2/22/1986',email:'fakeuser@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',visitHistory:null,registered:'false',user_id:'test',password:'test'}),
        knex('customers').insert({fullName: 'fakeName6',dateOfBirth:'9/23/1985',email:'fakeuser@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',visitHistory:null,registered:'false',user_id:'test',password:'test'}),
        knex('customers').insert({fullName: 'fakeName7',dateOfBirth:'11/24/1978',email:'fakeuser@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',visitHistory:null,registered:'false',user_id:'test',password:'test'}),
        knex('customers').insert({fullName: 'fakeName8',dateOfBirth:'12/25/1968',email:'fakeuser@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',visitHistory:null,registered:'false',user_id:'test',password:'test'}),
        knex('customers').insert({fullName: 'fakeName9',dateOfBirth:'10/27/1998',email:'fakeuser@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',visitHistory:null,registered:'false',user_id:'test',password:'test'}),
        knex('customers').insert({fullName: 'fakeName10',dateOfBirth:'7/16/2000',email:'fakeuser@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',visitHistory:null,registered:'false',user_id:'test',password:'test'}),
        knex('customers').insert({fullName: 'fakeName11',dateOfBirth:'8/15/2010',email:'fakeuser@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',visitHistory:null,registered:'false',user_id:'test',password:'test'}),
        knex('customers').insert({fullName: 'fakeName12',dateOfBirth:'1/18/2005',email:'fakeuser@gmail.com',address:'123 fake st, toronto',ph:'123 456 8888',visitHistory:null,registered:'false',user_id:'test',password:'test'})
        
      ]);
    });
};
