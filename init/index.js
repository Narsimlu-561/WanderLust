const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';
main()
  .then(()=>{
    console.log("connected to DB");
  })
  .catch((err)=>{
    console.log(err);
  })
async function main(){
  await mongoose.connect(MONGO_URL);
}
const initDB=async ()=>{
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=> ({...obj,owner : '688f4995e7a82d60fd66a048'})) // it will create a new array and it will insert 
  await Listing.insertMany(initData.data)//it is an object in this we have to access the key data
  console.log("data was initialized");
}
initDB();