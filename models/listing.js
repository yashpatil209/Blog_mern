const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listeningSchema = new Schema({
    title : String,
    image :{
        url : String,
    },
    para : String,
    category : String,
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : "Review",
    }],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    tags : [{
        type : String,
    }]
});


listeningSchema.post("findOneAndDelete" , async(listing) =>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews} });
    }
})

const Listing = mongoose.model("Listing" ,listeningSchema);
module.exports = Listing;