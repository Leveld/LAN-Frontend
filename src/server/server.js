const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const { USER_ERROR, asyncMiddleware, errorHandler } = require('./util');

const PORT = process.env.PORT || '3000';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('./src/public', {
  index: false
}));

app.get('/', asyncMiddleware(async (req, res, next) => {
  await res.sendFile(path.resolve(__dirname, '../public/index.html'));
}));

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

module.exports = app;
