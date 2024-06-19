/** @format */

import AuthorModel from '../models/AuthorModel.js';
import BookModel from '../models/BookModel.js';
import CategoryModel from '../models/CategoryModel.js';
import ChapterModel from '../models/ChapterModel.js';
import { v2 as cloudinary } from 'cloudinary';

const addNew = async (req, res) => {
	const body = req.body;
	try {
		console.log(body);

		res.send('fafafa');
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};
const addAuthor = async (req, res) => {
	const body = req.body;
	const file = req.file;

	try {
		if (file) {
			const dataURL = `data:${file.mimetype};base64,${file.buffer.toString(
				'base64'
			)}`;
			const fileName = file.originalname.split('.')[0];

			cloudinary.uploader.upload(
				dataURL,
				{
					public_id: fileName,
					resource_type: 'auto',
					folder: 'images',
				},
				async (err, result) => {
					const data = {
						name: body.name,
						bio: body.bio,
					};
					if (err) {
						console.log(err);
						throw new Error('Can not upload file');
					}
					if (result) {
						const image = result.url;
						data.image = image;
					}

					const newAuthor = new AuthorModel(data);

					await newAuthor.save();

					res.status(200).json({
						message: 'File was uploaded',
						data: newAuthor,
					});
				}
			);
		} else {
			const data = {
				name: body.name,
				bio: body.bio,
			};

			const newAuthor = new AuthorModel(data);

			await newAuthor.save();

			res.status(200).json({
				message: 'File was uploaded',
				data: newAuthor,
			});
		}
	} catch (error) {
		res.status(400).json({
			message: error.json,
		});
	}

	// try {
	//   const newAuthor = new AuthorModel(body)

	//   await newAuthor.save()

	//   res.status(200).json({
	//     message: 'Add done',
	//     data: newAuthor
	//   })
	// } catch (error) {
	//   res.status(400).json({
	//     message: error.message
	//   })
	// }
};
const addCategories = async (req, res) => {
	const body = req.body;
	try {
		const newCategory = new CategoryModel(body);

		await newCategory.save();

		res.status(200).json({
			message: 'Add done',
			data: newCategory,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};
const addChapter = async (req, res) => {
	const body = req.body;
	try {
		const item = new ChapterModel(body);

		await item.save();

		res.status(200).json({
			message: 'Add done',
			data: item,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};
const getBooks = async (req, res) => {
	try {
		const books = await BookModel.find();
		res.status(200).json({
			message: 'Add done',
			data: books,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};
const getCategories = async (req, res) => {
	try {
		const data = await CategoryModel.find();
		res.status(200).json({
			message: 'Add done',
			data: data,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};
const getAuthors = async (req, res) => {
	try {
		const data = await AuthorModel.find();
		res.status(200).json({
			message: 'Add done',
			data: data,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};
const getChapters = async (req, res) => {
	const { id } = req.query;
	try {
		const chapters = await ChapterModel.find({ bookId: id });
		res.status(200).json({
			message: 'Add done',
			data: chapters,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

export {
	addNew,
	addAuthor,
	addCategories,
	addChapter,
	getBooks,
	getCategories,
	getChapters,
	getAuthors,
};
