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
  },
  { timestamps: true }
);

const ProdCategory = mongoose.model("ProdCategory", prodCategorySchema);

module.exports = ProdCategory;
