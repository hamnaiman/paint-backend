import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinary;

console.log("CLOUD NAME:", process.env.CLOUD_NAME);
console.log("API KEY:", process.env.API_KEY);
console.log("API SECRET:", process.env.API_SECRET);