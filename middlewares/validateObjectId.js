// middlewares/validateObjectId.js
const mongoose = require('mongoose');

module.exports = function (req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid Task ID' });
  }
  next();
};
