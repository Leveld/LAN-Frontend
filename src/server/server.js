const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {Cookies} = require('react-cookie');
const {pages} = require('./config.json');
const { USER_ERROR, asyncMiddleware, errorHandler,  apiServerIP } = require('capstone-utils');

const PORT = process.env.PORT || '3000';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('./src/public', {
  index: false
}));

app.get('/error', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));  
});


app.get('/*', asyncMiddleware(async (req, res, next) => {
  const page = String(req.url).toLocaleLowerCase().split('?')[0];
  if(!pages.includes(page)) return res.redirect('/error');
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
}));

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
  process.env.NODE_ENV === 'production' || process.env.PRODUCTION ?
    console.log("Running In Production") :
    console.log("Running In Development");
});

module.exports = app;
