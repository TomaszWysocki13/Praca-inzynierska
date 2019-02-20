import Joi from 'joi';
import i18n from 'i18n';
import _ from 'lodash';

class ValidationError extends Error {
  constructor(errors) {
    super(errors);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    this.errors = errors;
  }
}

export default (data, schema) => new Promise((resolve, reject) => {
  const { error, value } = Joi.validate(data, schema, { abortEarly: false });

  if (error) {
    const errors = error.details.map(item => ({
      field: item.context.key,
      message: i18n.__(`${item.path.join('.')}.${item.type}`)
    }));

    return reject(new ValidationError(_.uniqBy(errors, 'field')));
  }

  return resolve(value);
});
