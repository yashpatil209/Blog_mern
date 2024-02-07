const Listing = require("../models/listing");
const User = require("../models/user.js");

module.exports.index = async(req ,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});
};

module.exports.newRoute = async(req , res)=>{
    res.render("listings/new.ejs");
};

module.exports.showRoute = async(req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({ path :"reviews",
    populate :{
        path: "author" ,
    },
})
    .populate("owner");
    if(!listing){
        req.flash("error" , "Article does not exitst!");
        res.redirect("/blogs");
    }
    res.render("listings/show.ejs" , {listing});
};

module.exports.createRoute = async(req , res , next)=>{
    let url = req.file.path;
    const newListing = new Listing(req.body.listing);
    newListing.category = newListing.category.toLowerCase();
    newListing.tags = newListing.tags.toString().split(",");
    newListing.image = {url};
    newListing.owner = req.user._id;
    const creator = await User.findById(newListing.owner);
    creator.articles.push(newListing._id);
    await newListing.save();
    await creator.save();
    console.log(creator);
    req.flash("success" , "New Article created!");
    res.redirect("/blogs");
};

module.exports.searchRoute = async(req , res)=>{
    let key = req.body.key;
    let allListings = await Listing.find({tags : key});
    res.render("listings/index.ejs",{allListings});
};

module.exports.editRoute = async(req ,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error" , "Article does not exitst!");
        res.redirect("/blogs");
    }
    res.render("listings/edit.ejs" , {listing});
};

module.exports.uploadRoute = async(req , res)=>{
    let {id} = req.params;
    req.body.listing.tags = req.body.listing.tags.split(",");
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    if(typeof req.file != "undefined"){
        let url = req.file.path;
        listing.image = {url};
        await listing.save();
    }

    req.flash("success" , "Article edited!");
    res.redirect(`/blogs/${id}`);
};

module.exports.categoryRoute = async(req , res)=>{
    let {id} = req.params;
    let allListings = await Listing.find({category : id});
    if(allListings.length == 0){
        req.flash("success" , "no data found!");
        res.redirect("/blogs");
    }
    res.render("listings/index.ejs",{allListings});
}

module.exports.deleteRoute = async(req , res)=>{
    let {id } = req.params;
    const list = await Listing.findByIdAndDelete(id);
    await User.findByIdAndUpdate(list.owner._id , {$pull : {articles : id}});
    
    req.flash("success" , "Article deleted!");
    res.redirect("/blogs");
};

module.exports.aboutRouter = async(req , res)=>{
    res.render("pages/about.ejs");
}