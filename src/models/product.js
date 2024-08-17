const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productCategory: {
      categoryName: {
        type: String,
        required: true,
        unique: true,
      },
      categoryDescription: {
        type: String,
        required: true,
      },
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
      type: String,
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
      default: 0,
      min: 0,
      max: 100,
    },
    seoTitle: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 70,
    },
    metaDescription: {
      type: String,
      required: true,
      minlength: 50,
      maxlength: 160,
    },
    status: {
      type: Boolean,
      default: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
