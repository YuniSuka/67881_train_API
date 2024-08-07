var express = require('express');
var router = express.Router();
const userSchema = require('../models/member')
const multer = require('multer')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken');
const { authToken } = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/',async function(req, res, next) {
  try {
    let users = await userSchema.find({})
    res.send(users);
  }catch(error){
    res.status(500).send(error)
  }
});

router.get('/:id',authToken ,async function(req, res, next) {
  const { id } = req.params
//   const { search } = req.query
  try {
    let user = await userSchema.findById(id)
    let is_pass = await bcrypt.compare('123456', user.password)

    user = {
        ...user._doc,
        is_pass
    }
    let token = await jwt.sign(user, "123456")
    let decode = await jwt.verify(token, "123456")
    
    // res.send(token)
    res.send(decode)
    // res.send(user);
  }catch(error){
    res.status(500).send(error)
  }


});

router.post('/', upload.single('profile'), async function(req, res, next) {

    const { name, age , password} = req.body
    const { authorization } = req.headers
    try {
      await userSchema.create({
         name, 
         age, 
         password: await bcrypt.hash(password, 10)
        })
      res.send('Create success.');
    } catch (error) {
      res.status(500).send(error)
    }

  });

router.put('/:id', async function(req, res, next) {
  const { id } = req.params
  const { name, age } = req.body
  try {
    await userSchema.findByIdAndUpdate(id, { name, age })
    res.send('Update success.');
  } catch (error) {
    res.status(500).send(error)
  }
});


router.delete('/:id', async function(req, res, next) {
  
  const { id } = req.params

  try {
    await userSchema.findByIdAndDelete(id)
    res.send('Delete success.');
  } catch (error) {
    res.status(500).send(error)
  }
});

module.exports = router;
