import Joi from 'joi';

const id = Joi.string();
const statement = Joi.string();
const alternative1 = Joi.string();
const score1 = Joi.number();
const alternative2 = Joi.string();
const score2 = Joi.number();
const alternative3 = Joi.string();
const score3 = Joi.number();

const getQuestionSchema = Joi.object({
    id: id.required(),
});
const createQuestionSchema = Joi.object({
    statement: statement.required(),
    alternative1: alternative1.required(),
    score1: score1.required(),
    alternative2: alternative2.required(),
    score2: score2.required(),
    alternative3: alternative3.required(),
    score3: score3.required(),
});

const updateQuestionSchema = Joi.object({
    statement: statement.required(),
    alternative1: alternative1.required(),
    score1: score1.required(),
    alternative2: alternative2.required(),
    score2: score2.required(),
    alternative3: alternative3.required(),
    score3: score3.required(),
});

export { getQuestionSchema, createQuestionSchema, updateQuestionSchema };
