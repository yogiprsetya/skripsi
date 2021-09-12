const mongoose = require('mongoose');
const { displayVR } = require('../services/360-view.service');

exports.VrData = async (req, res) => {
  const { projectId } = req.params;
  const objectId = mongoose.Types.ObjectId.isValid(projectId);

  if (!objectId) {
    return res.status(400).json({ message: 'Invalild id' })
  }

  const content = await displayVR(projectId, () => { });

  if (!content) {
    return res.status(404).send({ success: false, message: `content not found with ID ${projectId}` })
  }

  try {
    return res.status(200).send(content)
  } catch (err) {
    return res.status(500).send(err);
  }
}
