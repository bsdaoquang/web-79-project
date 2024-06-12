/** @format */

import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const login = async (req, res) => {
	const body = req.body
	const {username, password} = body

	try {
		const user = await UserModel.findOne({username})

		if (!user) {
			throw new Error('User not found')
		}

		const isMatchPassword= await bcrypt.compare(password, user.password)

		if (!isMatchPassword) {
			throw new Error('Username/Password is not correct'
			)
		}

		const payload = {
			_id: user._id,
			email: user.email ?? '',
			username,
			rule: 0
		}

		const accesstoken =  jwt.sign(payload, process.env.SECRET_KEY)

		res.status(200).json({
			message: 'Login successfully!!',
			data: {
				username, email: user.email, _id: user._id, accesstoken
			}
		})

	} catch (error) {
		res.status(405).json({
			message: error.message,
			data: []
		})
	}
	
};

const register = async (req, res) => {
	const body = req.body
	const {username, password} = body
	try {
	
		const user = await UserModel.findOne({username})
		if (user) {
			throw new Error('User is allready!!!')
		}


		const salt = await bcrypt.genSalt()
		const hashPassword = await bcrypt.hash(password, salt)

		const newUser = new UserModel({
			email: body.email,
			username, 
			password: hashPassword
		})

		await newUser.save()


		const payload = {
			_id: newUser._id,
			email: newUser.email ?? '',
			username,
			rule: 1
		}

		const accesstoken =  jwt.sign(payload, process.env.SECRET_KEY)


		res.status(201).json({
			message: 'Created',
			data: {
				username, email: body.email, _id: newUser._id, accesstoken
			}
		})

	} catch (error) {
		res.status(405).json({
			message: error.message,
			data: []
		})
	}
	
};

export { login, register };
