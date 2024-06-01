const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate")

// const { router } = require("../app");
const videoValidation = require("../../validations/video.validations");
const videoController = require("../../controllers/video.controller")



router.get('/', validate(videoValidation.searchVideos), videoController.getVideos);


router.post('/', validate(videoValidation.addVideo), videoController.addVideo)



router.patch('/:videoId/views', validate(videoValidation.updateViews), videoController.changeViews)


router.patch('/:videoId/votes', validate(videoValidation.updateVotes), videoController.changeVotes)



module.exports = router