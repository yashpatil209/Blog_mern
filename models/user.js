const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema ({
    email : {
        type : String ,
        required : true ,
    },
    articles : [{
        type : Schema.Types.ObjectId,
        ref : "Listing",
    }],
});

// it will automatic insert username and password
userSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model('User' , userSchema );