/** @format */

import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import { JWT } from '../utils/getJsonWebToken.js';

const login = async (req, res) => {
	try {
		const body = req.body;
		const { username, password } = body;

		if (!password || !username) {
			throw new Error('Missing values');
		}

		const existingUser = await UserModel.findOne({ username });

		if (!existingUser) {
			res.status(401);
			throw new Error('User not found');
		}

		const isMatchPassword = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isMatchPassword) {
			res.status(402);
			throw new Error('User name or Password is not correct');
		}

		res.status(200).json({
			message: 'Welcome back!',
			data: {
				username,
				_id: existingUser._id,
				accesstoken: JWT.GetJWT({ id: existingUser._id, username }),
			},
		});
	} catch (error) {
		res.status(400).json({
      message: error.message
    })
  }
};

const register = async (req, res) => {
	const body = req.body;
	const { username, password } = body;

	if (!password || !username) {
		throw new Error('Missing values');
	}

	const existingUser = await UserModel.findOne({ username });

	if (existingUser) {
		throw new Error('User is already!!!');
	}

	const salt = await bcrypt.genSalt(10);
	const hashPasword = await bcrypt.hash(password, salt);

	const newUser = new UserModel({
		username,
		password: hashPasword,
	});

	await newUser.save();

	res.status(201).json({
		message: 'Register successfully',
		data: {
			username,
			accesstoken: JWT.GetJWT({ id: newUser._id, username }),
		},
	});
};

export { login, register };
