const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {Cookies} = require('react-cookie');
const {apiServerIP} = require('../server/util');
const { USER_ERROR, asyncMiddleware, errorHandler, pages } = require('./util');

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
  if(!pages.includes(req.url)) return res.redirect('/error');
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
}));

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

module.exports = app;
