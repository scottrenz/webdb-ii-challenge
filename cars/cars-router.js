const express = require('express');

const db = require('../data/db-config.js'); // <<<<<<<<< changed

const router = express.Router();

router.get('/', (req, res) => {
  db('cars')
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve cars' });
    });
});
router.get('/sales', (req, res) => {
  db('carsales')
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve cars' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('cars')
    .where({ id })
    .first()
    .then(car => {
      res.json(car);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve car' });
    });
});
router.get('/sales/:id', (req, res) => {
  const { id } = req.params;

  db('carsales')
    .where({ id })
    .first()
    .then(car => {
      res.json(car);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve car' });
    });
});

router.post('/', (req, res) => {
  const carData = req.body;
  db('cars')
    .insert(carData)
    .then(ids => {
      db('cars')
        .where({ id: ids[0] })
        .then(newCarEntry => {
          res.status(201).json(newCarEntry);
        });
    })
    .catch(err => {
      console.log('POST error', err);
      res.status(500).json({ message: 'Failed to store data' });
    });
});

router.put('/:id', (req, res) => {
    // update posts set .... where id = 123
    const changes = req.body;
    console.log('changes',changes)
    console.log('id',req.params.id)
    db('cars')
    .where('id', req.params.id)
        .update(changes)
        .then(count => {
            res.status(200).json({ message: `updated ${count} record` });
        })
        .catch(err => {
            res.json(err);
        });
});

router.delete('/:id', (req, res) => {
    // delete from posts where ...
    db('cars')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            res.status(200).json({ message: `deleted ${count} records` });
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;
