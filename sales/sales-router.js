const express = require('express');

const db = require('../data/db-config.js'); // <<<<<<<<< changed

const router = express.Router();

router.get('/', (req, res) => {
  db('sales')
    .then(sales => {
      res.json(sales);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve sales' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('sales')
    .where({ id })
    .first()
    .then(sale => {
      res.json(sale);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve sale' });
    });
});

router.post('/', (req, res) => {
  const saleData = req.body;
  db('sales')
    .insert(saleData)
    .then(ids => {
      db('sales')
        .where({ id: ids[0] })
        .then(newsaleEntry => {
          res.status(201).json(newsaleEntry);
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
    db('sales')
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
    db('sales')
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
