const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');


const app = express();
const port= process.env.PORT || 3000;
const coinRouter = require('./src/routes/coinRoutes');

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');



app.use('/coins', coinRouter);


app.get('/', (req, res) => {
  res.render(
    'index', 
    {
      nav:[{ link: '/coins', title: 'Coins'},
        {link: '/platforms', title: 'Platforms'}], 
      title: 'To The MOON' 
    }
    );
});

app.listen(3000, () => {
  console.log(`Listening on port ${chalk.green(port)}`);
});
