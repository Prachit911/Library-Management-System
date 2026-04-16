import Joi from "joi";

export const borrowBookSchema = Joi.object({
  userId: Joi.string().trim().required(),
  bookId: Joi.string().trim().required()
});
