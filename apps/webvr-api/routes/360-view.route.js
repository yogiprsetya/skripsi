const express = require('express');
const router = express.Router();
const project = require('../controllers/360-view.controller');

router.get('/:projectId', project.VrData);

module.exports = router;