const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema  , reviewScheama} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const multer = require("multer");
const {storage} = require("../cloudconfig");
const upload = multer({storage});
const {isLoggedIn, isOwner ,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(upload.single("listing[image]"),
        validateListing ,wrapAsync( listingController.createRoute));

  
//new route
router.get("/new" ,isLoggedIn ,wrapAsync(listingController.newRoute));

// search route
router.post("/search" , (listingController.searchRoute));

// about route

router.get("/about" , (listingController.aboutRouter));

// category route 
router.get("/:id/categories" , (listingController.categoryRoute));

// edit route 
router.get("/:id/edit" , isLoggedIn, isOwner ,wrapAsync (listingController.editRoute));
        
    //upload and delete route
    router.route("/:id")
    .get(wrapAsync(listingController.showRoute))
    .put(upload.single("listing[image]"),
        isLoggedIn, isOwner,validateListing ,
        wrapAsync (listingController.uploadRoute))
    .delete(isLoggedIn,isOwner ,wrapAsync (listingController.deleteRoute))
        
        
module.exports = router;
        
// index route
// router.get("/"  ,wrapAsync(listingController.index));
// show route
// router.get("/:id" ,wrapAsync(listingController.showRoute));
        
//create route
// router.post("/" ,upload.single("listing[image]"),validateListing ,wrapAsync( listingController.createRoute));

//upload route
// router.put("/:id" ,upload.single("listing[image]"),isLoggedIn, isOwner,validateListing ,wrapAsync (listingController.uploadRoute)
// );
    
// //delete route
// router.delete("/:id" ,isLoggedIn,isOwner ,wrapAsync (listingController.deleteRoute));