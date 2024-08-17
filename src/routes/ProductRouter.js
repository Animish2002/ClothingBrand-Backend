const {
  addNewProduct,
  getALLProducts,
  getProductById,
  EditProduct,
} = require("../controllers/ProductController");
const { ensureAuth } = require("../middlewares/Auth");

const router = require("express").Router();

router.post("/addProduct", ensureAuth, addNewProduct);
router.get("/allProducts", getALLProducts);
router.get("/products/:id", getProductById);
router.put("/editProduct/:id", ensureAuth, EditProduct);

module.exports = router;
