const User = require("../models/user.js");

module.exports.signupForm = (req ,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req ,res)=>{
    try{
        let {username , email ,password} = req.body;
        const newUser = new User ({email ,username});
        const registeduser = await User.register(newUser , password);
        req.login(registeduser , (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success" , "user registered!");
            res.redirect("/blogs");
        });
    }
    catch(e){
        req.flash("error" , e.message);
        res.redirect("/signup");
    }
};

module.exports.loginForm = (req ,res)=>{
    res.render("users/login.ejs");
};

module.exports.loginRoute = async(req , res)=>{
    req.flash("success" , "you are login");
    let redirectUrl = res.locals.redirectUrl || "/blogs";
    res.redirect(redirectUrl);
};

module.exports.logoutRoute = (req , res , next) =>{
    req.logout((err) =>{
        if(err) {
            return next(err);
        }
        req.flash("success" , "you are logout");
        res.redirect("/blogs");
    })
};