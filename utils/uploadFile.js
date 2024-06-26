/** @format */

import { v2 as cloudinary } from 'cloudinary';
import { replaceName } from './replaceName.js';

export const handleUploadFile = (file) => {
	const dataURL = `data:${file.mimetype};base64,${file.buffer.toString(
		'base64'
	)}`;
	const fileName = replaceName(file.originalname.split('.')[0]);
  cloudinary.uploader.upload(
      dataURL,
      {
        public_id: fileName,
        resource_type: 'auto',
        folder: 'images',
      },() => {
        return 'fafafafa'
      }
    );

};
