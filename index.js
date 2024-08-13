const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./src/routes/AuthRouter.js");
const ProductRouter = require("./src/routes/ProductRouter.js");

require("dotenv").config();
require("./src/models/db.js");
const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("pong");
});


app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
}));
app.use("/api/auth", AuthRouter);
app.use("/api/products", ProductRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
