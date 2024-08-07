var express = require('express');
var router = express.Router();
const productSchema = require('../../models/product'); 


router.get('/', async (req, res, next) => {
  try {
    const orders = await productSchema.aggregate([
      {
        $unwind: '$order'
      },
      {
        $project: {
          productId: '$product_id',
          order: 1,
          price : 1
        }
      }
    ]);
    return res.send(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});


module.exports = router;