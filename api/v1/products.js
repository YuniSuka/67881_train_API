var express = require('express');
var router = express.Router();
const productSchema = require('../../models/product'); 

function generateUniqueOrderId() {
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random() * 10000);
  return `${timestamp}-${randomPart}`;
}

router.get('/', async function(req, res, next) {
    try {
        let products = await productSchema.find({});
        return res.status(200).send({
          status : 200,
          message : "Get product by id success.",
          data : products
    })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
          status : 500,
          message : "Get product by id success.",
          data : []
    })    }
});

router.get('/:id' ,async function(req, res, next) {
    const { id } = req.params
    try {
        let product = await productSchema.findById(id)
        return res.status(200).send({
          status : 200,
          message : "Get product by id success.",
          data : [product]
    });
    }catch(error){
      return res.status(500).send({
        status : 500,
        message : "Can't get product data from id.",
        data : []
  })
    }
  });


router.post('/', async function(req, res, next) {
    const { product_name, product_qty, product_price } = req.body;

    try {
        const newProduct = await productSchema.create({
            product_name,
            product_qty,
            product_price
        });

        return res.status(200).send({
            status: 200,
            message: 'Create product success.',
            data: {
                product_id: newProduct.product_id,
                product_name: newProduct.product_name,
                product_qty: newProduct.product_qty,
                product_price: newProduct.product_price
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: 500, message: 'Fail to create' });
    }
});


router.put('/:id', async function(req, res, next) {
    const { id } = req.params
    const { product_name ,product_qty ,product_price} = req.body
    try {
      await productSchema.findByIdAndUpdate(id, { product_name ,product_qty ,product_price})
      return res.status(200).send({
        status : 200,
        message : 'Update product success.',
        data: [req.body]
      });
    } catch (error) {
      return res.status(500).send({status: 500, message: 'Fail product update'  });    }
  });

router.delete('/:id', async function(req, res, next) {
    const { id } = req.params
    try {
      await productSchema.findByIdAndDelete(id)
      return res.status(200).send({
        status : 200,
        message : 'Delete product success.',
        data : []
      });
    } catch (error) {
      return res.status(500).send({status: 500, message: 'Fail product delete'  });    }
  });



router.get('/:id/orders',async function(req, res, next) {
  const { id } = req.params
  try {
      let product = await productSchema.findById(id)
      return res.status(200).send({        
        status: 200,
        message: "Query order product by product Id",
        product_name : product.product_name,
        order :product.order
      })
  }catch(error){
    return res.status(500).send({status: 500, message: 'Unknown cause'  });  }
});


router.post('/:id/orders', async function (req, res, next) {
  const { id } = req.params;
  const { order } = req.body;

  try {
    const product = await productSchema.findById(id);
    if (product) {
      if (typeof order === 'number' && order > 0) {
        if (product.product_qty >= order) {
          const newOrder = {
            quantity: order,
            total_price: order * product.product_price
          };

          product.order.push(newOrder);
          product.product_qty -= order;

          await product.save();

          return res.status(201).send({
            status: 201,
            message: "Create order success",
            product
          });
        } else {
          return res.status(400).send({ status: 400, message: 'Stock insufficient to fulfill order.' });
        }
      } else {
        return res.status(400).send({ status: 400, message: 'Input only number' });
      }
    } else {
      return res.status(404).send({ status: 404, message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: 500, message: 'Unknown cause' });
  }
});

module.exports = router;