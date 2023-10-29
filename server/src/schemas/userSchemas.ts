import Joi from 'joi';

const id = Joi.string();
const userName = Joi.string();
const password = Joi.string().min(6);
const email = Joi.string().email();
const role = Joi.string();

const getUserSchema = Joi.object({
    id: id.required(),
});
const signUpSchema = Joi.object({
    userName: userName.required(),
    password: password.required(),
    email: email.required(),
    role: role.default('patient'),
    phoneNumber: Joi.string().allow(null),
    ciudad: Joi.string().allow(null),
    genero: Joi.string().allow(null),
    fechaNacimiento: Joi.date().allow(null),
    professionalId: Joi.number().allow(null),
    professionalName: Joi.string().allow(null),
});

const signInSchema = Joi.object({
    password: password.required(),
    email: email.required(),
});

const updateUserSchema = Joi.object({
    userName: userName.required(),
    password: password.required(),
    email: email.required(),
    phoneNumber: Joi.string(),
    ciudad: Joi.string(),
    genero: Joi.string(),
    fechaNacimiento: Joi.date(),
});

export { getUserSchema, signUpSchema, signInSchema, updateUserSchema };
