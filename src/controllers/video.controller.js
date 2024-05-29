const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services");


const addVideo = catchAsync(async (req, res) => {
    const video = await videoService.addVideo(req.body);
    res.status(201).send({video});
})


const getVideos = catchAsync (async (req, res) => {
    const title = req.query.title || ""
    const genre = req.query.genre || ["All"]
    const contentRating = req.query.contentRating || "All"
    const sortBy = req.query.sortBy || "releaseDate"

    const videos = await videoService.getVideos(title, genre, contentRating, sortBy)
    res.status(200).send({videos})
})



const changeViews = catchAsync(async (req, res) => {
    const videoId = req.params.videoId
    await videoService.changeViews(videoId)
    res.status(204).send()
})




const changeVotes = catchAsync(async (req, res) => {
    const videoId = req.params.videoId
    const voteType = req.body.vote
    const voteChange = req.body.changeViews

    await videoService.changeVotes(videoId, voteType, voteChange)
    res.status(204).send()
})



module.exports = {
    addVideo,
    getVideos,
    changeViews,
    changeVotes
}