exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('cars') // <<<<<<<<<<<<<<<<<<<<<<change this
      .truncate() // resets the id primary key
      .then(function() {
        // Inserts seed entries
        return knex('cars').insert([
          // <<<<<< change table name here
          { vin: 'abc', make: 'Ford', model: 'Mustang', mileage: 120000, trantype: 'auto', status: 'clean' },
          { vin: 'xyz', make: 'Dodge', model: 'Charger', mileage: 100000, trantype: 'stick', status: 'fair' },
          { vin: 'g12', make: 'Jeep', model: 'Cheroke', mileage: 320000, trantype: 'stick', status: 'poor' },
        ]);
      });
  };
  