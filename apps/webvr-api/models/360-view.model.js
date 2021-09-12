const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VrData = new Schema({
  roomList: {
    type: Array
  },
}, {
    collection: 'vr-project'
  }
)

module.exports = mongoose.model('360-view', VrData);