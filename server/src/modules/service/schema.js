import Joi from '../../utils/joi';
import { EVENT_TYPES, TIME_STEP } from '../../config';

export const add = Joi.object().keys({
  user: Joi.objectId().required(),
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  uri: Joi.string()
    .min(3)
    .max(30)
    .uri()
    .required(),
  status: Joi.boolean().default(true)
});

export const edit = add.keys({
  id: Joi.objectId().required()
});

export const stats = Joi.object().keys({
  id: Joi.objectId().required(),
  user: Joi.objectId().required(),
  type: Joi.string()
    .valid(EVENT_TYPES)
    .required(),
  unit: Joi.string()
    .valid(TIME_STEP)
    .required(),
  from: Joi.date().required(),
  to: Joi.date()
    .min(Joi.ref('from'))
    .required()
});

export const userAndEntity = Joi.object().keys({
  id: Joi.objectId().required(),
  user: Joi.objectId().required()
});

export const id = Joi.objectId().required();
