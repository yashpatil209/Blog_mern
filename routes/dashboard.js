const express = require("express");
const router = express.Router({mergeParams : true});

const dashcontroller = require("../controllers/dashboard.js");

router.get("/" , (dashcontroller.dashRender));

router.get("/myart" , (dashcontroller.myarticle));
        
module.exports = router;