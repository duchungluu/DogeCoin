const express = require('express');
const coinRouter = express.Router();

function router(nav){
  const coins = [
    {
      title: 'Bitoin',
      genre: 'crypto',
      author: 'Satoshi',
      read: false
    },
    {
      title: 'LuuCoin',
      genre: 'cryptonite',
      author: 'Luu',
      read: true
    },
  ]
  coinRouter.route('/')
    .get((req,res) => {
      res.render(
        'coinListView',
        {
          nav, 
          title: 'To The MOON' ,
          coins
        }
        );
    });
  
  coinRouter.route('/:id')
    .get((req,res) => {
 //  const id = req.params.id;  SAME AS BELOW
     const { id } = req.params;
      res.render(
        'coinView',
        {
          nav, 
          title: 'To The MOON' ,
          coin: coins[id]
        }
        );
    });
    return coinRouter
}

    module.exports = router;