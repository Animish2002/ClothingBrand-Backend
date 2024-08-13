const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
    required: true,
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productSize: {
    type: String,
    required: true,
    enum: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  totalAmount: {
    type: Number,
    required: true,
  },
 
  discount: {
    type: Number,
    required: true,
    
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;