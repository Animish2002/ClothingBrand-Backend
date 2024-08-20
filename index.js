const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./src/routes/AuthRouter.js");
const ProductRouter = require("./src/routes/ProductRouter.js");
const CategoryRouter = require("./src/routes/ProductCategory.js");
const AdminRoutes = require("./src/routes/AdminRoutes.js");


require("dotenv").config();
require("./src/models/db.js");
const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
  })
);
app.use("/api/auth", AuthRouter);
app.use("/api/products", ProductRouter);
app.use("/api/products/category", CategoryRouter);
app.use("/api", AdminRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
