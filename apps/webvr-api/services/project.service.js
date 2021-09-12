const projectSchema = require('../models/project.model');

exports.findByUser = (username, callback) => projectSchema.find({ username }, (err, result) => {
  if (err) {
    return callback(err);
  }
  return callback(null, result);
});

exports.findById = async (projectId, callback) => {
  return projectSchema.findById(projectId, (err, result) => {
    if (err) {
      return callback(err)
    }
    return callback(null, result)
  });
}

exports.findByIdAndDelete = async (projectId) => {
  if (!projectId) {
    return Promise.reject(new Error('Invalid id'));
  }
  return projectSchema.findByIdAndDelete(projectId);
}
