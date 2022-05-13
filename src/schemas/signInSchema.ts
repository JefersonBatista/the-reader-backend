import Joi from "joi";
import { SignInData } from "../services/authService";

const signInSchema = Joi.object<SignInData>({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default signInSchema;
