/** @format */
import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
	try {
		const accesstoken = req.headers.authorization;
		const token = accesstoken ? accesstoken.split(' ')[1] : '';

		if (!token) {
			res.status(401);
			throw new Error('Unauthorization');
		}

    const isVerify = jwt.verify(token, process.env.SECRET_KEY)
		
		if (isVerify) {
			req.uid = isVerify._id
			req.rule = isVerify.rule
			next()
		}else{
			res.status(403);
			throw new Error('Access token is not valid!!!');
		}
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
};

export default verifyToken;
