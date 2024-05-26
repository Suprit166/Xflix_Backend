const { contentRatings } = require("../utils/values");




const getPossibleContentRatings = (contentRating) => {
    let contentRatings = [...Values.contentRatings];

    if (contentRating === "All") {
        return contentRatings;
    }

    const contentRatingIndex = contentRatings.indexOf(contentRating);

    const getPossibleContentRatings = contentRatings.splice(contentRatingIndex);

    return getPossibleContentRatings;
};



const getVideos = async (title, genres, contentRating, sortBy) => {
    let titleQuery = {title: {$regex:title}}
    let contentRatings = getPossibleContentRatings(contentRating)
    let contentRatingsQuery = {contentRating:{$in:contentRatings}}

    let genreQuery = {genre:{$in:genres}}
    if(genres)
}