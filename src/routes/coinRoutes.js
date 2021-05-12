const express = require('express');
const coinRouter = express.Router();

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
        'coins',
        {
          nav:[{ link: '/coins', title: 'Coins'},
            {link: '/platforms', title: 'Platforms'}], 
          title: 'To The MOON' ,
          coins
        }
        );
    });
  
  coinRouter.route('/Doge')
    .get((req,res) => {
      res.send('All in Doge');
    });

    module.exports = coinRouter;