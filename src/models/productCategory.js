const mongoose = require("mongoose");

const prodCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    categoryDescription: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

const ProdCategory = mongoose.model("ProdCategory", prodCategorySchema);

module.exports = ProdCategory;
