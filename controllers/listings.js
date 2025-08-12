const { response } = require("express");
const Listing=require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });  //it is a func which works up on heocoding

module.exports.index=async (req,res)=>{
  const allListings=await Listing.find({});
  res.render("./listings/index.ejs",{allListings})
}

module.exports.renderNewForm=(req,res)=>{
  res.render("listings/new.ejs")
}

module.exports.showListing=async (req,res)=>{
  let {id}=req.params;
  const listing=await Listing.findById(id)
  .populate({
    path : "reviews", //for every listing we should have the reviews
    populate :{
      path :"author"  //for every review should have the author
    }
  })
  .populate("owner"); //
  if(! listing){
    req.flash("error","Listing you requested for does not exist !");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs",{listing})
}

module.exports.createListing=async (req,res,next)=>{
    let responce=await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1
    })
    .send()

    let url=req.file.path;
    let filename=req.file.filename;

    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;//current user id
    newListing.image= {url,filename};
    
    newListing.geometry=responce.body.features[0].geometry;
    let savedListing=await newListing.save();// if exists it will save in the database
    console.log(savedListing);
    
    req.flash("success","New listing created !");
    res.redirect("/listings");
}

module.exports.renderEditForm=async (req,res)=>{
  let {id}=req.params;
  const listing=await Listing.findById(id);
    if(! listing){
    req.flash("error","Listing you requested for does not exist !");
    res.redirect("/listings");
  }

  let originalImageUrl=listing.image.url;
  originalImageUrl=originalImageUrl.replace("/upload","/upload/h_200,w_200")
  res.render("listings/edit.ejs",{listing,originalImageUrl})
}

module.exports.updateListing=async (req,res)=>{
  let {id}=req.params;
  let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing})// ...req.body.listing it is a js object which consists of some parameters and it will deconstruct it & it will convert into individual values. we are passing these values into new updated values
  
  if(typeof req.file !=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
  }

  req.flash("success","Listing Updated !");
  res.redirect(`/listings/${id}`);
}

module.exports.destroyListing=async (req,res)=>{
  let {id}=req.params;
  let deleteListing=await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
   req.flash("success","Listing Deleted !");
  res.redirect("/listings");
}