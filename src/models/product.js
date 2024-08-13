const { ref } = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ProdCategory",
    },
    productQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    productMaterial: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productSize: {
      type: String,
      required: true,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    productImage: {
      type: String, // URL or file path
      required: true,
    },
    productColor: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    productDiscount: {
      type: Number,
      default: 0, // Default value if not provided
      min: 0,
      max: 100,
    },
    seoTitle: {
      type: String,
      required: true,
      minlength: 10, // Example of a length validator
      maxlength: 70, // Example of a length validator
    },
    metaDescription: {
      type: String,
      required: true,
      minlength: 50, // Example of a length validator
      maxlength: 160, // Example of a length validator
    },
    status:{
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
