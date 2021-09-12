const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const project = require('../controllers/project.controller');

const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
})

const upload = multer({ storage: storage, limits: { fileSize: 100000000 } });

router.post('/', upload.single('thumbnail'), passport.authenticate('jwt', { session: false }), project.init);
router.get('/me', passport.authenticate('jwt', { session: false }), project.myproject);

router.put('/room/:projectId', upload.single('roomTexture'), passport.authenticate('jwt', { session: false }), project.createRoom);
router.put('/room/:projectId/:index', passport.authenticate('jwt', { session: false }), project.createRoomButton);
router.delete('/room/:projectId/:index/:button', passport.authenticate('jwt', { session: false }), project.deleteRoomButton);
router.delete('/room/:projectId/:index', passport.authenticate('jwt', { session: false }), project.deleteRoom);

router.get('/:projectId', passport.authenticate('jwt', { session: false }), project.findOne);
router.delete('/:projectId', passport.authenticate('jwt', { session: false }), project.delete);

module.exports = router;