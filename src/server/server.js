const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {Cookies} = require('react-cookie');
const {pages} = require('./config.json');
const { USER_ERROR, asyncMiddleware, errorHandler,  apiServerIP, frontServerIP } = require('capstone-utils');
// IMGAGE UPLOADER: FEATURE IN PROGRESS
const multer = require('multer');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const {clientSecret} = require('./secret.json');
const fs = require('fs');




const PORT = process.env.PORT || '3000';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '../../public'), {
  index: false
}));


const imgbuffer = multer.memoryStorage();
const test = multer({storage: imgbuffer});
const buff = test.single('image');

const storage = (media, type) => multer.diskStorage({destination:async (req, file, cb) => {

  const user = await axios.get(`${apiServerIP}user`, {headers:{Authorization: req.headers.authorization}});
  const id = jwt.sign(await user.data._id, clientSecret);
  const m = jwt.sign(media, clientSecret);
  const t = jwt.sign(type, clientSecret);
  const path = `data/${m.split('.')[1]}/${t.split('.')[1]}/${id.split('.')[1]}`;
  multer({dest: `${path}`});
  cb(null, `./${path}`);
},
  filename: (req, file, cb) => {
    cb(null, jwt.sign('tax forms', clientSecret).split('.')[1] + '.bdocs') ;
  }
});




const credentials = multer({storage: storage('images','credentials')});
const upload = credentials.single('image');

app.post('/upload', upload, (req, res) => {
  // const img = fs.readFileSync(req.file.path);
  // const base = img.toString('base64');
  // const encode = jwt.sign(base, clientSecret);
  // fs.writeFileSync(req.file.path, encode);
  res.send('success');
});

app.get('/*', asyncMiddleware(async (req, res, next) => {
  const domain = /^(https?:\/\/)?([^:^\/]*)(:[0-9]*)(\/[^#^?]*)(.*)/g.exec(frontServerIP);
  const { user, ...rest } = req.query;
  if (user) {
    try {
      const access_token = jwt.verify(user, clientSecret).access_token;
      return await res
                      .status(307)
                      .cookie('access_token', jwt.verify(user, clientSecret).access_token, {
                        secure: false,
                        domain: domain[2],
                        maxAge: 604800
                      })
                      .redirect(url.format({
                        pathname: url.parse(req.url).pathname,
                        query: rest
                      }));
    } catch (error) {}
  }

  // const page = String(req.url).toLocaleLowerCase().split('?')[0];
  //if(!pages.includes(page)) return res.redirect('/error');
  res.sendFile(path.resolve(__dirname, '../../public/index.html'));
}));

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
  process.env.NODE_ENV === 'production' || process.env.PRODUCTION ?
    console.log("Running In Production") :
    console.log("Running In Development");
});

module.exports = app;
