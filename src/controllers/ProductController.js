const Product = require("../models/product.js");
const cloudinary = require("../utils/cloudinary.js");
const fs = require("fs").promises;

const addNewProduct = async (req, res) => {
  try {
    const {
      productName,
      productCategory,
      productQuantity,
      productMaterial,
      productDescription,
      productSize,
      productColor,
      productPrice,
      productDiscount,
      seoTitle,
      metaDescription,
      status,
    } = req.body;

    // Check if the product already exists
    const productExists = await Product.findOne({ productName });
    if (productExists) {
      return res
        .status(409)
        .json({ message: "Product already exists", success: false });
    }

    // Handle product images uploaded through Cloudinary
    const productImage = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          console.log("Uploading file:", file.path);
          const result = await cloudinary.uploader.upload(file.path);
          console.log("Cloudinary result:", result); // Log the Cloudinary response
          productImage.push({
            url: result.secure_url,
            public_id: result.public_id,
          });
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError);
        } finally {
          // Remove the file from the server after upload attempt
          await fs.unlink(file.path);
        }
      }
    }

    if (req.files) {
      console.log("Files received:", req.files);
    } else {
      console.log("No files received");
    }

    // Create a new product document in MongoDB
    const newProduct = new Product({
      productName,
      productCategory,
      productQuantity,
      productMaterial,
      productDescription,
      productSize,
      productImage,
      productColor,
      productPrice,
      productDiscount,
      seoTitle,
      metaDescription,
      status,
      createdOn: Date.now(),
    });

    // Save the product to MongoDB
    const savedProduct = await newProduct.save();

    return res.status(201).json({
      message: "Product added successfully",
      success: true,
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const getALLProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error retrieving product by ID:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const EditProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product by ID:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};
module.exports = {
  addNewProduct,
  getALLProducts,
  getProductById,
  EditProduct,
};
