const Listing=require("../models/listing.js"); 
const Review=require("../models/review.js");

module.exports.createReview=async (req,res)=>{ //we are passing the func to the validateReview in server side 
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id; //when we create a new review we should have the author associated to that review
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","New Review created !");
    res.redirect(`/listings/${listing._id}`)
}

module.exports.destroyReview=async (req,res)=>{
  let {id,reviewId}=req.params;

  await Listing.findByIdAndUpdate(id,{$pull : {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
   req.flash("success","Review Deleted !");
  res.redirect(`/listings/${id}`);
}