const {
  addNewProduct,
  getALLProducts,
  getProductById,
  EditProduct,
} = require("../controllers/ProductController");
const { ensureAuth } = require("../middlewares/Auth");
const upload = require("../middlewares/FileUploadMiddleware");
const { productValidation } = require("../middlewares/ProductAuth");

const router = require("express").Router();

router.post(
  "/add-product",
  ensureAuth,
  upload.array("productImage", 5),
  productValidation,
  addNewProduct
);
router.get("/allProducts", getALLProducts);
router.get("/products/:id", getProductById);
router.put("/editProduct/:id", ensureAuth, productValidation, EditProduct);

module.exports = router;
