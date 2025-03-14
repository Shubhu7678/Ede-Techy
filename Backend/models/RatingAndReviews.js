const mongoose = require('mongoose');

const RatingAndReviews = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
        index: true
    },
    rating: {

        type: Number,
        required: true,
    },
    review: {

        type: String,
        required: true,
        trim : true,
    }
});

module.exports = mongoose.model('RatingAndReviews', RatingAndReviews);
