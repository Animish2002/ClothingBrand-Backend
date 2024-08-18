const {
  addNewCategory,
  getProductCategory,
  editProductCategory,
  getProductCategoryById,
} = require("../controllers/ProductCategoryContoroller");
const { ensureAuth } = require("../middlewares/Auth");
const {
  productCategoryValidation,
} = require("../middlewares/AuthProductCategory");

const router = require("express").Router();

router.post(
  "/addProductCategory",
  ensureAuth,
  productCategoryValidation,
  addNewCategory
);
router.get("/ProductCategory", getProductCategory);
router.get("/ProductCategory/:id", getProductCategoryById);
router.put(
  "/editProductCategory/:id",
  ensureAuth,
  productCategoryValidation,
  editProductCategory
);

module.exports = router;
