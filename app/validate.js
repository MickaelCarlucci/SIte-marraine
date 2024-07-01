const validate = (dataProp, schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req[dataProp]);
    next();
  } catch (err) {
    res.status(400).json({ message: err.details[0].message });
  }
};
  
module.exports = validate;