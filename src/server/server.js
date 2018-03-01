const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {Cookies} = require('react-cookie');
const {pages} = require('./config.json');
const { USER_ERROR, asyncMiddleware, errorHandler,  apiServerIP } = require('capstone-utils');
// IMGAGE UPLOADER: FEATURE IN PROGRESS
const multer = require('multer');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const {clientSecret} = require('./secret.json');
const fs = require('fs');

const convos = [
  {
    id: 'convo ID 1',
    userids:[{id:'5a97a2ddf808ba7cb8682dde', type:'business'}],
    messages:[
      {
        from: {id:'5a97a2ddf808ba7cb8682dde', type:'business'},
        message: 'this is a message from Brandon',
        timestamp: Date.now()
      }
    ]
  },
  {
    id: 'convo ID 2',
    userids: [{id:'5a97a2ddf808ba7cb8682dde', type:'business'}, {id:'Jason', type:''}, {id:'bob', type:''}],
    messages:[
      {
        from: {id:'5a97a2ddf808ba7cb8682dde', type:'business'},
        message: 'this is a message from User Brandon',
        timestamp: Date.now()
      },
      {
        from: {id:'Jason', type:''},
        message: 'this is a message from User jason',
        timestamp: Date.now()
      },
      {
        from: {id:'bob', type:''},
        message: 'this is a message from User bob',
        timestamp: Date.now()
      }
    ]
  },
  {
    id: 'convo ID 3',
    userids: [{id:'5a97a2ddf808ba7cb8682dde', type:'business'}, {id:'Jon', type:''}],
    messages:[
      {
        from: {id:'5a97a2ddf808ba7cb8682dde', type: 'business'},
        message: 'this is a message from User Brandon',
        timestamp: Date.now()
      },
      {
        from: {id:'Jon', type:''},
        message: 'this is a message from User Jon',
        timestamp: Date.now()
      }
    ]
  }
]




const PORT = process.env.PORT || '3000';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('./src/public', {
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
  const img = fs.readFileSync(req.file.path);
  const base = img.toString('base64');
  const encode = jwt.sign(base, clientSecret);
  fs.writeFileSync(req.file.path, encode);
  res.send('success');
});

app.get('/error', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));  
});
app.get('/messages', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));  
});


app.get('/', asyncMiddleware(async (req, res, next) => {
  const page = String(req.url).toLocaleLowerCase().split('?')[0];
  //if(req.url === '/convos') return res.send(convos);
  //if(!pages.includes(page)) return res.redirect('/error');
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
}));

app.get('/convos', (req, res) => {
  axios.get(`${apiServerIP}user`, {headers:{Authorization: req.headers.authorization}})
  .then((r) =>{
    
  
    res.json(convos);
  })
});

app.post('/message', (req, res) => {;

  
  convos.forEach((convo, i) => {
    let found = true;
    req.body.to.forEach((user,j) => {
      const userids = [];
      convo.userids.forEach((item) => userids.push(item.id) );
      
      if(!userids.includes(req.body.from.id) || !userids.includes(user.id)) return found = false;
      if(j === req.body.to.length - 1 && found === false)return  res.send({});
            
    });
    if(found === true) {
      console.log(found);
      convo.messages.push({from:req.body.from, message: req.body.message, timestamp: Date.now()});
      return res.send({convos: convos, convo: convo});
    }
  })
  
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
  process.env.NODE_ENV === 'production' || process.env.PRODUCTION ?
    console.log("Running In Production") :
    console.log("Running In Development");
});

module.exports = app;
