import Joi from "joi";

const bookmarkSchema = Joi.object({
  currentPage: Joi.number().integer().min(1).required(),
});

export default bookmarkSchema;
