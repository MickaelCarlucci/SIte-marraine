const Joi = require ("joi");

const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schema = Joi.object({
  lastname: Joi.string()
    .min(2)
    .max(25)
    .messages({
      'string.base': "Votre Nom doit être une chaîne de caractères.",
      'string.min': "Votre Nom doit comporter au moins 2 caractères.",
      'string.max': "Votre Nom ne doit pas dépasser 25 caractères.",
      'any.required': "Votre Nom est requis."
    }),
  firstname: Joi.string()
    .min(2)
    .max(25)
    .required()
    .messages({
      'string.base': "Votre Prénom doit être une chaîne de caractères.",
      'string.min': "Votre Prénom doit comporter au moins 2 caractères.",
      'string.max': "Votre Prénom ne doit pas dépasser 25 caractères.",
      'any.required': "Votre Prénom est requis."
    }),
  mail: Joi.string()
    .pattern(pattern)
    .min(5)
    .max(60)
    .required()
    .messages({
      'string.base': "Votre adresse mail doit être une chaîne de caractères.",
      'string.pattern.base': "Votre adresse mail n'est pas conforme.",
      'string.min': "Votre adresse mail doit comporter au moins 5 caractères.",
      'string.max': "Votre adresse mail ne doit pas dépasser 60 caractères.",
      'any.required': "Votre adresse mail est requise."
    }),
  message: Joi.string()
    .min(20)
    .max(3000)
    .messages({
      'string.base': "Votre message doit être une chaîne de caractères.",
      'string.min': "Votre message doit comporter au moins 20 caractères.",
      'string.max': "Votre message ne doit pas dépasser 3000 caractères.",
      'any.required': "Votre message est requis."
    }),
  'g-recaptcha-response': Joi.string().required()
});

module.exports = schema;
