const { router } = require("../app");

router

.get('/', validate(videoValidation.searchVideos), videoController.getVideos);


router.post('/', validate(videoValidation.addVideo), videoController.addVideo)



.patch('/:videoId/views', validate(videoValidation.updateViews), videoController.changeViews)


.patch('/:videoId/votes', validate(videoValidation.updateVotes), videoController.changeVotes)



module.exports = router