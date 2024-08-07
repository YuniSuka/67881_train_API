var express = require('express');
var router = express.Router();
const userSchema = require('../../models/member'); 



router.post('/', async function(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await userSchema.findOne({ username });
      
        if (user) {
           
            res.send({                
                "status": 200,
                "message": "Login success",
                "data" : [req.body]
            });
        }
        else{
            res.send({                
                "status": 400,
                "message": 'Failed to login.',
                "data" : [req.body]
            });   
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

module.exports = router;