const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js")

const multer  = require('multer')   //to handle files (multipart/form-data)
const {storage}=require("../cloudConfig.js");
const upload = multer({storage})

const listingController=require("../controllers/listings.js");

router.route("/") //this route will handle get,post routes
  //index route  
  .get(wrapAsync(listingController.index))
  //Create route
  .post(
      isLoggedIn,
      // validateListing,
      upload.single('listing[image]'),   //passed the validate schema(Joi) as a middleware
      validateListing,
      wrapAsync(listingController.createListing)
  );

//NEW Route new it is always above the id path if we write it in the below
// it will treat the /new path as an id & it will search for the new id we get error
router.get("/new",isLoggedIn ,listingController.renderNewForm)

router.route("/:id")
  //show route
  .get(
  wrapAsync(listingController.showListing))
  
  //update route
  .put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListing))

  //DELETE route
  .delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);


//Edit route
router.get("/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm))

module.exports=router;
