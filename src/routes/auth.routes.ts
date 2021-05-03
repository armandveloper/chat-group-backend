import { Router } from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/auth.controller';
import { checkErrors } from '../validations/checkErrors';

const router = Router();

router.post(
	'/register',
	[
    body('name', 'Your name is required').not().isEmpty(),
		body('email', 'Email must be a valid email').isEmail(),
		body('password', 'Password must be at least 8 characters').isLength({
			min: 8,
		}),
		checkErrors,
	],
	register
);

router.post(
	'/login',
	[
		body('email', 'Email is required').isEmail(),
		body('password', 'Password is required').isLength({
			min: 8,
		}),
		checkErrors,
	],
	login
);

export default router;
