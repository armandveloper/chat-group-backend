import { Router } from 'express';
import { body, param } from 'express-validator';
import {
	getProfile,
	updatePhoto,
	updateProfile,
} from '../controllers/users.controller';
import { checkErrors } from '../validations/checkErrors';

const router = Router();

router.get(
	'/:id',
	[param('id', 'A valid user id is required').isMongoId(), checkErrors],
	getProfile
);
router.put(
	'/:id',
	[
		param('id', 'A valid user id is required').isMongoId(),
		body('name', 'Your name is required').not().isEmpty(),
		checkErrors,
	],
	updateProfile
);
router.put(
	'/:id/photo',
	[param('id', 'A valid user id is required').isMongoId(), checkErrors],
	updatePhoto
);

export default router;
