import 'dotenv/config';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.APP_CLOUDNARY_API_NAME,
  api_key: process.env.APP_CLOUDNARY_API_KEY,
  api_secret: process.env.APP_CLOUDNARY_API_SECRETE
});

export default cloudinary;
