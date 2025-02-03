import Joi from 'joi';

export const getItemByIdSchema = Joi.object({
    id: Joi.number().integer().required().description('Please add item id'),
})

export const deleteItemSchema = getItemByIdSchema;

export const createItemSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.empty': 'Field "name" cannot be empty',
        'any.required': 'Field "name" is required'
    }),
    price: Joi.number().integer().min(0).required().messages({
        'number.base': 'Field "price" must be a number',
        'number.integer': 'Field "price" must be an integer',
        'number.min': 'Field "price" cannot be negative',
        'any.required': 'Field "price" is required'
    })
});

export const updateItemSchema = createItemSchema;
