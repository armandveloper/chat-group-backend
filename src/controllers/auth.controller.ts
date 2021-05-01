import { Request, Response } from 'express';
import User from '../models/User';
import { createToken } from '../helpers/jwt';

export const register = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({
				success: false,
				msg: 'Email already in use',
			});
		}
		const user = new User({ email, password });
		await user.hashPassword(password);
		await user.save();
		res.status(201).json({ success: true, msg: 'Register successfully' });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			msg: 'Something Went Wrong. Try again later',
		});
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				success: false,
				msg: 'Email or password are incorrect',
			});
		}
		if (!(await user.isValidPassword(password))) {
			return res.status(401).json({
				success: false,
				msg: 'Email or password are incorrect',
			});
		}
		return res.json({
			success: true,
			msg: 'Login successfully',
			token: createToken(user),
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			msg: 'Something Went Wrong. Try again later',
		});
	}
};
