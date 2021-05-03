import { Router } from 'express';
import { body, param } from 'express-validator';
import { createChannel, inviteUser } from '../controllers/channels.controller';
import { checkErrors } from '../validations/checkErrors';

const router = Router();

router.post(
	'/',
	[
		body('name', "Channel's name is required").not().isEmpty(),
		body('name', "Channel's name is required").not().isEmpty(),
		body('creator', 'A valid user id is required').isMongoId(),
		checkErrors,
	],

	createChannel
);

router.post(
	'/:id',
	[
		param('id', 'A valid channel id is required').isMongoId(),
		body('email', 'A valid email is required').isEmail(),
		checkErrors,
	],
	inviteUser
);

export default router;
