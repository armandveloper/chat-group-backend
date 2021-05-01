import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const checkErrors = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.json({ success: false, errors: errors.array() });
	}
	next();
};
