const multer = require('multer');
const {Cookies} = require('react-cookie');

const storage = multer.diskStorage({destination:(req, file, cb) => {
  multer({dest: `images/${user.status}/${user.username}`});
  cb(null, `./images/${user.status}/${user.username}`);
},
  filename: (req, file, cb) => {
    cb(null, `profile.jpg`);
  }
});
const upload = multer({storage:storage});

const fs = require('fs');

const imgUpload = (req, res) => {
  res.json("Loaded");
}

const getImage = (req, res) => res.sendFile(require(`../images/${req.headers.authorization}/${req.params.name}`));


const deleteImg =  (req, res) => fs.unlink('./uploads/'+ req.params.name, (err) => err ? res.json('failed') : res.json('success'));

module.exports = (route) => {
  route.delete('/delete/:name', deleteImg);
  route.post('/profile',  upload.single('image'), imageUpload);
  route.get('/images/:name', getImage);
}