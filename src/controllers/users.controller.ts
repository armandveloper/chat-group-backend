import path from 'path';
import { promises as fs } from 'fs';
import { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary';
import User from '../models/User';

export const getProfile = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id).select('-password');
		res.json({ success: true, user });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			msg: 'Something Went Wrong. Try later',
		});
	}
};

export const updateProfile = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, bio, phone } = req.body;
	try {
		const user = await User.findByIdAndUpdate(
			id,
			{ name, bio, phone },
			{
				new: true,
			}
		).select('name bio phone');
		res.json({ success: true, user });
	} catch (err) {
		console.log('Update profile error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something Went Wrong. Try later',
		});
	}
};

export const updatePhoto = (req: Request, res: Response) => {
	const { id } = req.params;
	const storage = multer.diskStorage({
		destination: path.join(__dirname, '..', 'public', 'uploads'),
		filename: (_, file, cb) => {
			cb(null, id + path.extname(file.originalname));
		},
	});
	const upload = multer({
		storage,
		limits: {
			fileSize: 1000 * 1000 * 10, // 10MB,
		},
	}).single('image');
	upload(req, res, async (err: any) => {
		if (err) {
			console.log('Image upload error: ', err);
			return res.json({ success: false, msg: 'Failed image upload' });
		}
		try {
			const result = await cloudinary.uploader.upload(req.file.path, {
				resource_type: 'image',
				public_id: `chat-group/${id}`,
				overwrite: true,
				transformation: [
					{ width: 150, height: 150, gravity: 'face', crop: 'thumb' },
				],
			});
			await User.findByIdAndUpdate(id, {
				photo: result.secure_url,
			}).select('name bio phone');
			res.json({ success: true, photo: result.secure_url });
			await fs.unlink(req.file.path);
		} catch (err) {
			console.log('Update photo error:', err);
			res.status(500).json({
				success: false,
				msg: 'Something Went Wrong. Try later',
			});
		}
	});
};
