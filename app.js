if(process.env.NODE_ENV !="production"){   //at time deployment ->production
  require('dotenv').config(); // This disables logging

}  //we are in development phase not production phase

const express=require("express");
const app=express();
const mongoose=require("mongoose");
let port=8080;
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

const listingRouter=require("./routes/listing.js")
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js")

const dburl=process.env.ATLASDB_URL;

main()
  .then(()=>{
    console.log("connected to DB")
  })
  .catch((err)=>{
    console.log(err);
  })
async function main(){
  await mongoose.connect(dburl);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended :true}))
app.use(methodOverride("_method"))
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store=MongoStore.create({
  mongoUrl:dburl,
   crypto: {
    secret: process.env.SECRET
  },
  touchAfter :24 * 3600,                //Interval (in seconds) between session updates we can set 24 hourse or we need.
})

store.on("error",()=>{
  console.log("ERROR in MONGO SESSION STORE",err)
});

const sessionOptions={
  store,
  secret : process.env.SECRET,//it cannot be visible to the people
  resave :false,               //it is a sensitive information
  saveUninitialized:true,
  cookie:{
    expires :Date.now() +7 *24 *60*60*1000,
    maxAge : 7 *24 *60*60*1000,
    httpOnly :true //secrity : to prevent from cross scripting attacks
  }
}

// app.get("/",(req,res)=>{
//   res.send("Hi am root");
// });

app.use(session(sessionOptions))
app.use(flash()); //joust above the routes

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());//to serialize users inton the sessions(user info stored in a session -> serialize)
passport.deserializeUser(User.deserializeUser());//to de-serialize users inton the sessions(once user end the session (logout) we need to de-serialize )

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
})

app.use("/listings",listingRouter);//requiring listings
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter)

app.all("/*splat",(req,res,next)=>{
  next(new ExpressError(404,"Page not found !"))
})//for all incoming bad req's

app.use((err,req,res,next)=>{
  let {statusCode=500,message="something went wrong !"}=err;
  res.status(statusCode).render("error.ejs",{message});
  // res.status(statusCode).send(message);
});

app.listen(port,()=>{
  console.log(`server is listening to port ${port}`);
});
