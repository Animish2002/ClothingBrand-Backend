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
    productImage: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
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
      maxlength: 500, // Example of a length validator
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
