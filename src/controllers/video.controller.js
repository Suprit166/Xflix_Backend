


const getVideos = catchAsync (async (req, res) => {
    const title = req.query.title || ""
    const genre = req.query.genre || ["All"]
    const contentRating = req.query.contentRating || "All"
    const sortBy = req.query.sortBy || "releaseDate"

    const videos = await videoService.getVideos(title, genre, contentRating, sortBy)
    res.status(200).send({videos})
})



module.exports = {
    getVideos
}