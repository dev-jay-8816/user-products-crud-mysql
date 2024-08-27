import Joi from 'joi';

export const createProductSchema = Joi.object({
    title: Joi.string().required().label('Title'),
    description: Joi.string().required().label('Description'),
    is_enabled: Joi.boolean().required(),
    published_date: Joi.date().required().label('Publish Date'),
    image_url: Joi.string().allow(null, '')
})

export const updateProductSchema = Joi.object({
    title: Joi.string().required().label('Title'),
    description: Joi.string().required().label('Description'),
    is_enabled: Joi.boolean().required(),
    published_date: Joi.date().required().label('Publish Date'),
    image_url: Joi.string().allow(null, '')
})

export const productIdParamSchema = Joi.object({
    id: Joi.number().required().label('Product Id Required.')
})