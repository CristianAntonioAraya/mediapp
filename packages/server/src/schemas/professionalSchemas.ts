import Joi from 'joi';

const id = Joi.string();
const professionalName = Joi.string();
const speciality = Joi.string();
const range = Joi.number();

const getProfessionalSchema = Joi.object({
    id: id.required(),
});
const createProSchema = Joi.object({
    professionalName: professionalName.required(),
    speciality: speciality.required(),
    range: range.required(),
});

export { createProSchema, getProfessionalSchema };
