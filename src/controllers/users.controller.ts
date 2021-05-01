import { Request, Response } from 'express';

export const getProfile = (req: Request, res: Response) => {
	const { id } = req.params;
	res.json({ success: true, user: req.user });
};
