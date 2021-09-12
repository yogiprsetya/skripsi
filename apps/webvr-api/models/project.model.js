const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Project = new Schema({
  title: {
    type: String
  },
  username: {
    type: String
  },
  description: {
    type: String
  },
  thumbnail: {
    type: String
  },
  roomList: {
    type: Array
  },
}, {
    collection: 'vr-project'
  }
)

module.exports = mongoose.model('Project', Project);