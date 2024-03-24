import Joi from "joi";
import { CreateUser, Login } from "./users.types";

// validators

export const createUserSchema = Joi.object<CreateUser>({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
  phoneNumber: Joi.string().required(),
});

export const loginSchema = Joi.object<Login>({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
  deviceId: Joi.string(),
  deviceName: Joi.string(),
});