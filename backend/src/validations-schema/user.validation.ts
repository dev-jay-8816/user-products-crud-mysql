import Joi from 'joi';

export const registerUserSchema = Joi.object({
    first_name: Joi.string().required().label('First Name'),
    last_name: Joi.string().required().label('Last Name'),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});


export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});