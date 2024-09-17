const Joi = require("joi");

const productValidation = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden access", success: false });
  }

  const schema = Joi.object({
    productName: Joi.string().min(4).max(100).required(),
    productCategory: Joi.object({
      categoryName: Joi.string().min(4).max(1000).required(),
      categoryDescription: Joi.string().min(4).max(1000).required(),
    }).required(),
    productQuantity: Joi.number().min(0).required(),
    productMaterial: Joi.string().min(4).max(100).required(),
    productDescription: Joi.string().min(4).max(500).required(),
    productSize: Joi.string()
      .valid("XS", "S", "M", "L", "XL", "XXL")
      .required(),
    productColor: Joi.string().min(3).max(50).required(),
    productPrice: Joi.number().min(0).required(),
    productDiscount: Joi.number().min(0).max(100).default(0),
    seoTitle: Joi.string().min(10).max(100).required(),
    metaDescription: Joi.string().min(50).max(500).required(),
    status: Joi.boolean().default(true),
    productImage: Joi.string().optional(), // Allow the productImage field
    // productImage: Joi.array().items(
    //   Joi.object({
    //     url: Joi.string().uri().required(),
    //     public_id: Joi.string().required(),
    //   })
    // ).optional() // Allows productImage to be an array of objects or not present
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Bad Request", error: error.details[0].message });
  }
  next();
};

module.exports = { productValidation };
