const { string, number } = require("joi");
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  address1: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pinCode: {
    type: number,
    required: true,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address ;
