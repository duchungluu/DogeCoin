const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const port= process.env.PORT || 3000;

const config = {
  user: 'test',
  password: 'Est12345!',
  server: 'duclu.database.windows.net',
  database: 'PSLibary',

  options: {
    encrypt:true
  }
};
//sql.connect(config).catch(err => debug(err));

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');

const nav = [
  { link: '/coins', title: 'Coin'},
  { link: '/platforms', title: 'Platform'}
];

const coinRouter = require('./src/routes/coinRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/coins', coinRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.render(
    'index', 
    {
      nav, 
      title: 'To The MOON' 
    }
    );
});

app.listen(3000, () => {
  console.log(`Listening on port ${chalk.green(port)}`);
});
