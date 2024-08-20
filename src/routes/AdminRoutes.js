const { getAllUsers } = require("../controllers/AdminController");
const { ensureAuth } = require("../middlewares/Auth");

const router = require("express").Router();

router.get("/users", ensureAuth, getAllUsers);

module.exports = router;