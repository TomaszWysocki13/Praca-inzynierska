import Joi from '../../utils/joi';

export const login = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .min(3)
    .max(30)
    .required()
});

export const register = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(3)
    .max(30)
    .required(),
  repassword: Joi.string()
    .min(3)
    .max(30)
    .required()
    .valid(Joi.ref('password'))
});

export const edit = register.keys({
  id: Joi.objectId().required(),
  oldPassword: Joi.string()
    .min(3)
    .max(30)
    .required()
});

export const account = Joi.object().keys({
  id: Joi.objectId().optional()
});
