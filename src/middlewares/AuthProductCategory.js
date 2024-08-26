const Joi = require("joi");

const productCategoryValidation = (req, res, next) => {
  // Check if the user's role is not admin
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden access", success: false });
  }

  // Validate the request body using Joi
  const schema = Joi.object({
    categoryName: Joi.string().min(4).max(100).required(),
    categoryDescription: Joi.string().min(4).max(500).required(), // Fixed typo
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Bad Request", error: error.details[0].message });
  }

  // Proceed to the next middleware/controller if validation is successful
  next();
};

module.exports = { productCategoryValidation };
