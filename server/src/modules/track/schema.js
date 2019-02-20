import Joi from '../../utils/joi';
import { EVENT_TYPES } from '../../config';

const user = Joi.object().keys({
  ip: Joi.string()
    .ip()
    .allow('')
    .default('')
    .optional(),
  browser: Joi.string()
    .allow('')
    .default('')
    .optional(),
  language: Joi.string()
    .allow('')
    .default('')
    .optional(),
  country: Joi.string()
    .allow('')
    .default('')
    .optional(),
  region: Joi.string()
    .allow('')
    .default('')
    .optional(),
  city: Joi.string()
    .allow('')
    .default('')
    .optional()
});

export const event = Joi.object().keys({
  sid: Joi.objectId().required(),
  type: Joi.string()
    .valid(EVENT_TYPES)
    .required(),
  uri: Joi.string()
    .uri()
    .required(),
  user
});

export const id = Joi.objectId().required();
