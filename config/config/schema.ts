import joi from 'joi';

export default joi.object({
  DATABASE_USER: joi.string().required(),
  DATABASE_PASSWORD: joi.string().required(),
});
