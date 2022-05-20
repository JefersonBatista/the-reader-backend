import Joi from "joi";

import { CreateReadingIntentionData } from "../repositories/readingIntentionRepository.js";

const readingIntentionSchema = Joi.object<CreateReadingIntentionData>({
  title: Joi.string().required(),
  author: Joi.string(),
  imageUrl: Joi.string().uri(),
});

export default readingIntentionSchema;
