// Additional validators (optional helpers) used elsewhere if needed.
// This file provides a small helper to build Joi validators consistently.

const Joi = require('joi');

exports.idParam = () => Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid ID format');

exports.pagination = () => Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10)
});
