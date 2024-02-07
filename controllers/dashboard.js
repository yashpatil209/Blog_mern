const Listing = require("../models/listing");
const User = require("../models/user.js");


module.exports.dashRender = async(req ,res)=>{
    res.render("pages/profile.ejs");
}

module.exports.myarticle = async(req , res)=>{
    let {id} = req.params;
    const user = await User.findById(id).populate("articles");
    res.render("pages/myart.ejs" , {user});
};