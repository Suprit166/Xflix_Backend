const httpStatus = require("http-status");
const mongoose = require("mongoose");

const { Videos } = require("../models");
const ApiError = require("../utils/ApiError");
const Values = require("../utils/values");
const { Video } = require("../models/video.model");





const getPossibleContentRatings = (contentRating) => {
    let contentRatings = [...Values.contentRatings];

    if (contentRating === "All") {
        return contentRatings;
    }

    const contentRatingIndex = contentRatings.indexOf(contentRating);

    const getPossibleContentRatings = contentRatings.splice(contentRatingIndex);

    return getPossibleContentRatings;
};


const sortVideos = (videos, sortBy = "releaseDate") => {

    videos.sort((video1, video2) => {
        let field1 = video1[sortBy];
        let field2 = video2[sortBy];

        if (sortBy === "releaseDate") {
            field1 = new Date(field1).getTime();
            field2 = new Date(field2).getTime();
        }

        if (field1 > field2) {
            return -1;
        }

        return 1;
    });
}


const getVideos = async (title, genres, contentRating, sortBy) => {
    let titleQuery = {title: {$regex:title}}
    let contentRatings = getPossibleContentRatings(contentRating)
    let contentRatingsQuery = {contentRating:{$in:contentRatings}}

    let genreQuery = {genre:{$in:genres}}
    if(genres.includes("All")) {
        genreQuery = null
    }

    const videos = await Video.find({
        ...titleQuery,
        ...contentRatingsQuery,
        ...genreQuery
    })

    videos = sortVideos(videos, sortBy)
    return videos;    
}



const findVideoById = async (id) => {
    const video = await Video.findVideoById(id);

    if (!video) {
        throw new ApiError(httpStatus.NOT_FOUND, "No video found with mating id")
    }

    return video;
}



const getVideo = async (videoId) => {
    const video = await findVideoById(videoId);
    return video;
}



const addVideo = async (videoBody) => {
    const video = await Video.create(videoBody)
    return video;
}


const changeViews = async (videoId) => {
    const video = await findVideoById(videoId)
    video.viewCount++
    await video.save()
    return;
}



const changeVotes = async (videoId, voteType, voteChange) => {
    const video = await findVideoById(videoId)

    let changeVoteTypes = "";
    if (voteType === "upVote") {
        changeVoteTypes = "upVotes"
    } else {
        changeVoteTypes = "downVotes"
    }

    let prevVotes = video.votes[changeVoteTypes]
    let newVotes = prevVotes


    if (voteChange == 'increase') {
        newVotes+=1
    } else {
        newVotes-=1
    }

    newVotes = Math.max(newVotes, 0)
    video.votes[changeVoteTypes] = newVotes
    await video.save()
    return;
}


module.exports = {
    getVideo,
    getVideos,
    addVideo,
    changeViews,
    changeVotes
}