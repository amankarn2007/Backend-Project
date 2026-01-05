const Joi = require("joi");

module.exports.ProductSchema = Joi.object({
    image: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
    bgcolor: Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
    pannelcolor: Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
    textcolor: Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
})

module.exports.UserSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
})