const VRData = require('../models/360-view.model');

exports.displayVR = async (projectId, callback) => {
  return VRData.findById(projectId, (err, result) => {
    if (err) {
      return callback(err)
    }
    return callback(null, result)
  });
}
