const { uploadProductImage } = require("../controllers/UploadController");
const upload = require("../middlewares/FileUploadMiddleware");

const router = require("express").Router();

router.post("/uploadImages", upload.any("productImage"), uploadProductImage);


module.exports = router;
