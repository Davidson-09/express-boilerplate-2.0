import Joi from "joi";
import { Login } from "../users/users.types";

export const loginSchema = Joi.object<Login>({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    deviceId: Joi.string(),
    deviceName: Joi.string(),
});
// validators