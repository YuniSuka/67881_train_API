const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);



const orderSchema = new mongoose.Schema({
    order_id: { type: Number },
    quantity: { type: Number, required: true },
    total_price: { type: Number }
});
orderSchema.plugin(AutoIncrement, { inc_field: 'order_id' });


const productSchema = new mongoose.Schema({
    product_id: { type: Number },
    product_name: { type: String, required: true, unique: true },
    product_qty: { type: Number, required: true, min: 0 },
    product_price: { type: Number, required: true },
    order: [orderSchema]
}, {
    timestamps: true
});

productSchema.plugin(AutoIncrement, { inc_field: 'product_id' });

module.exports = mongoose.model('products', productSchema);
