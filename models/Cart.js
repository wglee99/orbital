const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: {
        type: String,
        ref: "user"
    },
    items: [{
        productId: {
            type: String,
        },
        name: {
            type: String,
        }
    }],
});

module.exports = Cart = mongoose.model('cart',CartSchema);