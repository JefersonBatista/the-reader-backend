import Joi from "joi";
import { CreateNoteData } from "../repositories/noteRepository.js";

const noteSchema = Joi.object<CreateNoteData>({
  chapter: Joi.number().integer().min(1),
  page: Joi.number().integer().min(1),
  placeInText: Joi.string(),
  content: Joi.string().required(),
});

export default noteSchema;
