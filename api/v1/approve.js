var express = require('express');
var router = express.Router();
const userSchema = require('../../models/member'); 


router.get('/:id', async function(req, res, next) {
    const { id } = req.params
    try {
        let user = await userSchema.findById(id)
        return res.send({                
          status: 200,
          message: "Get user success",
          data : [user]
      });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});


router.put('/:id', async function(req, res, next) {
  const { id } = req.params;
  const { approve } = req.body
  try {
      if (id) {
          let user = await userSchema.findByIdAndUpdate(id,{ approve });
          if (user) {
            return res.send({                
              status: 200,
              message: "Update user success",
              data : [user]
          })
          } else {
              throw new Error("No id in mongodb");
          }
      }
  } catch (error) {
      if (error.message === "No id in mongodb") {
          return res.status(404).send({
            status: 500,
            Message : "No id in database",
            data : []
          });
      } else {
          console.log(error);
          return res.status(500).send(error);
      }
  }
});
  


module.exports = router;