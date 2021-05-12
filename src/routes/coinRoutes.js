const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:coinRoutes');

const coinRouter = express.Router();

function router(nav) {
  coinRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('coins');

          const coins = await col.find().toArray();

          res.render(
            'coinListView',
            {
              nav,
              title: 'Library',
              coins
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  coinRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('coins');

          const coin = await col.findOne({ _id: new ObjectID(id) });
          debug(coin);
          res.render(
            'coinView',
            {
              nav,
              title: 'Library',
              coin
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return coinRouter;
}


module.exports = router;
