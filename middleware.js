const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema ,reviewScheama} = require("./schema.js");

module.exports.isLoggedIn = (req , res , next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl
        req.flash("error" , "you must be loggedin!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req , res , next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req ,res ,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error" , "you are not owner of this listing !");
        return res.redirect(`/blogs/${id}`);
    }
    next();
};

module.exports.validateListing = (req , res ,next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400 , errMsg);
    }else {
        next();
    }
};

module.exports.validateReview = (req , res ,next) =>{
    let {error} = reviewScheama.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400 , errMsg);
    }else {
        next();
    }
};

module.exports.isReviewAuthor = async(req , res , next)=>{
    let {id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error" , "you are not create this review!");
        return res.redirect(`/blogs/${id}`);
    }
    next();
};