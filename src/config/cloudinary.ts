import { v2 as cloudinary } from 'cloudinary';
import config from '.';

cloudinary.config(config.CLOUDINARY_URL);

export default cloudinary;
