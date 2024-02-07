const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title :Joi.string().required(),
        image : Joi.string().allow("",null),
        para :Joi.string().required(),
        category :Joi.string().required(),
        tags : Joi.string().required(),
    }).required()
});

module.exports.reviewScheama = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required(),

    }).required()
})