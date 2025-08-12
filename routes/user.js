const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js")

const userController=require("../controllers/users.js")

router.route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signUp)
);

router.route("/login")
  .get(userController.renderLoginForm)
  .post(
  saveRedirectUrl, //
  passport.authenticate("local",{
    failureRedirect :'/login',
    failureFlash :true
  }), 
  userController.login
);
       //failureRedirect :'/login', failureFlash :true 
       // if the user is unable to login the the user agin go to the login page
router.get("/logout",userController.logout)
module.exports=router;

