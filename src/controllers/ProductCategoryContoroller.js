const ProdCategory = require("../models/productCategory.js");

const addNewCategory = async (req, res) => {
  try {
    const { categoryName, categoryDescription } = req.body;
    const existingCategory = await ProdCategory.findOne({ categoryName });
    if (existingCategory) {
      return res.status(409).json({
        message: "Product Category already exists",
        success: false,
      });
    }
    const newCategory = new ProdCategory({
      categoryName,
      categoryDescription,
    });

    const savedCategory = await newCategory.save();
    return res.status(201).json({
      message: "New category added",
      success: true,
      data: savedCategory,
    });
  } catch (error) {
    console.error("Error adding category:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const getProductCategory = async (req, res) => {
  try {
    const categories = await ProdCategory.find();
    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const getProductCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ProdCategory.findById(id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const editProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedCategory = await ProdCategory.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedCategory) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  addNewCategory,
  getProductCategory,
  getProductCategoryById,
  editProductCategory,
};
