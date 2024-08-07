var express = require('express');
var router = express.Router();
const userSchema = require('../../models/member');
const bcrypt = require('bcrypt')



// router.post('/', async function(req, res, next) {
//     const { username, password } = req.body
//     try {
//         const user = await userSchema.findOne({ username ,password });
//       if (user){
//         await userSchema.create({
//             username, 
//             password : await bcrypt.hash(password, 10)
//         })
//         res.status(201).send({                
//           "status": 201,
//           "message": "Create success",
//           "data" : [req.body]
//     })}
//     } catch (error) {
//       res.status(400).send({                
//         "status": 400,
//         "message": "Username has already been used.",
//         "data" : [req.body]
//     });
//     }
//   });


  router.post('/', async function(req, res, next) {

    const { username, password } = req.body

    try {
        await userSchema.create({
            username, 
            password 
        })
        res.status(201).send({                
          "status": 201,
          "message": "Create success",
          "data" : [req.body]
    })} catch (error) {
      console.log(error)
      res.status(400).send({                
        "status": 400,
        "message": "Username has already been used.",
        "data" : [req.body]
    });

  }});





module.exports = router;
