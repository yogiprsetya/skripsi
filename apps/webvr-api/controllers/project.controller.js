const mongoose = require('mongoose');
const projectSchema = require('../models/project.model');
const { findByUser, findById, findByIdAndDelete } = require('../services/project.service');
const { uploadFile, removeFile } = require('../helpers/aws.helper');

exports.init = async (req, res) => {
  const file = req.file;

  try {
    const dir = `vr-content/${req.body.username}/${req.body.title.replace(/\s/g,'-')}/${file.originalname}`
    const uploadSuccess = await uploadFile(file, dir);

    if (uploadSuccess) {
      const document = new projectSchema({
        title: req.body.title,
        username: req.body.username,
        description: req.body.description,
        thumbnail: uploadSuccess.Location
      });

      document.save(function(error, newFile) {
        if (error) {
          throw error;
        }
      });

      return res.status(201).json({ success: true, message: "Successfully create new content", content: document })
    }

    return res.status(500).json({ success: false, message: 'Failed to upload all files. Please retry.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error creating VR content", err: err })
  }
}

exports.createRoom = (req, res) => {
  const file = req.file;

  projectSchema.findById(req.params.projectId, async (err, vrContent) => {
    if (!vrContent) {
      res.status(404).send("data is not found");
    } else {
      const dir = `vr-content/${vrContent.username}/${vrContent.title.replace(/\s/g,'-')}/roomList/${file.originalname}`;
      const uploadSuccess = await uploadFile(file, dir);

      if (uploadSuccess) {
        vrContent.roomList.push({
          roomName: req.body.roomName,
          roomTexture: uploadSuccess.Location,
          roomButton: []
        });

        vrContent.save()
          .then(data => res.json(`Room ${data.roomList[0].roomName} created`))
          .catch(err => res.status(400).send("Update not possible: ", err))
      }
    }
  });
};

exports.createRoomButton = (req, res) => {
  const indexRoom = req.params.index;
  const { roomTargetIndex, buttonRotation } = req.body;

  projectSchema.findById(req.params.projectId, async (err, vrContent) => {
    if (!vrContent) {
      res.status(404).send("project is not found");
    } else {
      vrContent.roomList.set(indexRoom, {
        ...vrContent.roomList[indexRoom],
        roomButton: [
          ...vrContent.roomList[indexRoom].roomButton,
          { roomTargetIndex, buttonRotation }
        ]
      });

      vrContent.save()
        .then(data => res.json(data.roomList))
        .catch(err => res.status(400).send("Update not possible: ", err))
    }
  });
};

exports.deleteRoom = async (req, res) => {
  const indexRoom = req.params.index;

  projectSchema.findById(req.params.projectId, async (err, vrContent) => {
    if (!vrContent) {
      res.status(404).send("project is not found");
    } else {
      vrContent.roomList.splice(indexRoom, 1);

      vrContent.save()
        .then(data => res.json(data.roomList))
        .catch(err => res.status(400).send("Update not possible: ", err))
    }
  });
};

exports.deleteRoomButton = async (req, res) => {
  const { projectId, index, button } = req.params;

  projectSchema.findById(projectId, async (err, vrContent) => {
    if (!vrContent) {
      res.status(404).send("project is not found");
    } else {
      const room = await vrContent.roomList[index]
      room.roomButton.splice(button, 1);

      vrContent.roomList.set(index, {
        ...vrContent.roomList[index],
        roomButton: room.roomButton
      });

      vrContent.save()
        .then(data => res.json(data))
        .catch(err => res.status(400).send("Update not possible: ", err))
    }
  });
};

exports.myproject = async (req, res) => {
  try {
    const content = await findByUser(req.user.email, () => { });
    const contents = content;

    return res.status(200).json({
      success: true,
      docs: contents
    });
  } catch (err) {
    return res.status(500).send(err);
  }
}

exports.findOne = async (req, res) => {
  const { projectId } = req.params;
  const objectId = mongoose.Types.ObjectId.isValid(projectId);

  if (!objectId) {
    return res.status(400).json({ message: 'Invalild id' })
  }

  const content = await findById(projectId, () => { });

  if (!content) {
    return res.status(404).send({ success: false, message: `content not found with ID ${projectId}` })
  }

  try {
    return res.status(200).send(content)
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  const { projectId } = req.params;

  try {
    const content = await findByIdAndDelete(projectId, () => { });

    if (!content) {
      return res.status(404).send({ success: false, message: "VR Content not found" })
    }

    const folder = `vr-content/${content.username}/${content.title}`;
    const deleteSucces = await removeFile(folder);

    if (deleteSucces) {
      return res.status(200).send({ success: true, message: "Content deleted successfully", content: content })
    }

    return res.status(500).json({ success: false, message: 'Content deleted not successfully' });
  } catch (err) {
    return res.status(500).send(err);
  }
};
