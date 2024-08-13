//mongodb connection
const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_CONN;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB not connected", err);
  });
// const connectDB = async () => {
//   try {
//     await mongoose.connect(mongo_url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
