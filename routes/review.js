const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");
const { createReview, deleteReview } = require("../controllers/review.js");


// post  route
router.post("/" ,isLoggedIn,validateReview ,wrapAsync( reviewController.createReview));

// delete review route

router.delete("/:reviewId" ,isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports =  router;