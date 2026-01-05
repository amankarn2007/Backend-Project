const Joi = require("joi");

module.exports.ProductSchema = Joi.object({
    image: Joi.string().allow("").optional(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
    bgcolor: Joi.alternatives().try(
        Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
        Joi.string().alphanum(),
    ).allow("").optional(),
    pannelcolor: Joi.alternatives().try(
        Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
        Joi.string().alphanum(),
    ).allow("").optional(),
    textcolor: Joi.alternatives().try(
        Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
        Joi.string().alphanum(),
    ).allow("").optional(),
})

module.exports.UserSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
})