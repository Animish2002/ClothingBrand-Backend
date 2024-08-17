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
      categoryName: Joi.string().min(4).max(100).required(),
      categoryDescription: Joi.string().min(4).max(255).required(),
    }).required(),
    productQuantity: Joi.number().min(0).required(),
    productMaterial: Joi.string().min(4).max(100).required(),
    productDescription: Joi.string().min(4).max(100).required(),
    productSize: Joi.string().valid("XS", "S", "M", "L", "XL", "XXL").required(),
    productImage: Joi.string().uri().required(),
    productColor: Joi.string().min(3).max(50).required(),
    productPrice: Joi.number().min(0).required(),
    productDiscount: Joi.number().min(0).max(100).default(0),
    seoTitle: Joi.string().min(10).max(70).required(),
    metaDescription: Joi.string().min(50).max(160).required(),
    status: Joi.boolean().default(true),
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
