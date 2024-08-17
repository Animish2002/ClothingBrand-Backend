const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    address: Joi.object({
      address1: Joi.string().required(),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      pinCode: Joi.string().required(),
    }).required(),
    password: Joi.string().min(4).max(100).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Confirm password does not match password",
      }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: "Bad Request", error: error.details[0].message });
  }

  // Assign default role "user" if not provided
  if (!req.body.role) {
    req.body.role = "user";
  }

  next();
};


const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: "Bad Request", error: error.details[0].message });
  }

  next();
};

module.exports = { signupValidation, loginValidation };
