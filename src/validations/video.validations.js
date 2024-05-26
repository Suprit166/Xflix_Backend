const { query } = require("express");



const searchVideos = {
    query: Joi.object().keys({
        title: Joi.string(),
        genres: Joi.stringArray().items(Joi.string().valid(...Values.genres, "All")),
        contentRating: Joi.string().valid(...Values.contentRatings, "All"),
        sortBy: Joi.string().valid(...Values.sortBy)
    })
}