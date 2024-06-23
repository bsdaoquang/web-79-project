/** @format */

import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import authRouter from './routers/authRouter.js';
import postRouter from './routers/postRouter.js';
import taskRouter from './routers/taskRouter.js';
import { replaceName } from './utils/replaceName.js';

dotenv.config();
cloudinary.config({
	cloud_name: 'dkletq0ej',
	api_key: '178554658644286',
	api_secret: process.env.CLOUDDINARY_SECRET,
});

const app = express();
const PORT = process.env.PORT || 3001;
const dburl = `mongodb+srv://bsdaoquangyhocso:${process.env.DB_PASSWORD}@cluster0.z6pqsie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/tasks', taskRouter);
app.use('/posts', postRouter)
app.post('/upload', upload.single('file'), async (req, res) => {
	const file = req.file;
	try {
		if (!file) {
			throw new Error('File not found');
		}

		const dataURL = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = replaceName(file.originalname.split('.')[0])

     cloudinary.uploader.upload(dataURL, {
      public_id: fileName,
      resource_type: 'auto',
      folder: 'images'
     }, (err, result) => {
      if (err) {
        console.log(err)
        throw new Error('Can not upload file')
      }
      if (result) {
        res.status(200).json({
          message: 'File was uploaded',
          data: result
        })
      }
     })

	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
});

const connectDb = async () => {
	try {
		await mongoose.connect(dburl);
		console.log(`Connect to database successfully!!!!`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};


connectDb().then(() => {
	app.listen(PORT, (err) => {
		if (err) {
			console.log(err);
			return;
		}

		console.log(`Server starting at http://localhost:${PORT}`);
	});
});
