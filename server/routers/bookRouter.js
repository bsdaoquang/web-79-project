/** @format */

import { Router } from 'express';
import {
	addAuthor,
	addCategories,
	addChapter,
	addNew,
	getAuthors,
	getBooks,
	getCategories,
	getChapters,
} from '../controllers/bookController.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const bookRouter = Router();

bookRouter.post('/add-new-book', addNew);
bookRouter.post('/add-author', upload.single('file'), addAuthor);
bookRouter.post('/add-category', addCategories);
bookRouter.post('/add-chapter', addChapter);
bookRouter.get('/get-chapters', getChapters);
bookRouter.get('/get-books', getBooks);
bookRouter.get('/get-authors', getAuthors);
bookRouter.get('/get-categories', getCategories);

export default bookRouter;
