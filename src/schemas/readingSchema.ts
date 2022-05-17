import Joi from "joi";

import { CreateReadingData } from "../repositories/readingRepository.js";

const readingSchema = Joi.object<CreateReadingData>({
  title: Joi.string().required(),
  author: Joi.string(),
  imageUrl: Joi.string().uri(),
  numChapters: Joi.number().integer().min(1),
  numPages: Joi.number().integer().min(1),
});

export default readingSchema;
