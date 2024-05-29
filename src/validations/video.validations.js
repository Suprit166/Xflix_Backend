// const Joi = require("../utils/values");
const customValidator = require("./custom.validation");
const Values = require("../utils/values");
const { param } = require("../app");


const addVideo = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        videoLink: Joi.string().required().custom(customValidator.videoLink),
        genre: Joi.string().required().valid(...Values.genres),
        contentRating: Joi.string().required().valid(...Values.contentRatings),
        releaseDate: Joi.string().required().custom(customValidator.releaseDate),
        previewImage: Joi.string().uri()
    }),
};




const searchVideos = {
    query: Joi.object().keys({
        title: Joi.string(),
        genres: Joi.stringArray().items(Joi.string().valid(...Values.genres, "All")),
        contentRating: Joi.string().valid(...Values.contentRatings, "All"),
        sortBy: Joi.string().valid(...Values.sortBy)
    })
};



const updateVotes = {
    params: Joi.object().keys({
        videoId: Joi.required().custom(customValidator.objectId),
    }),
    body: Joi.object().keys({
        vote: Joi.string().required().valid(...Values.updateVoteTypes),
        change: joi.string().required().valid(...Values.changeVoteTypes)
    })
}



const updateViews = {
    params: Joi.object().keys({
        videoId: Joi.required().custom(customValidator.objectId),
    }),
};





module.exports = {
    addVideo,
    searchVideos,
    updateViews,
    updateVotes
}