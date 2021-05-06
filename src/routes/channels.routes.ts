import { Router } from 'express';
import { body, param } from 'express-validator';
import {
	createChannel,
	getMembers,
	inviteUsers,
} from '../controllers/channels.controller';
import { isArrayOfEmail } from '../validations';
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
		body('emails', 'The email list must have at least one email')
			.isArray({ min: 1 })
			.custom(isArrayOfEmail),
		checkErrors,
	],
	inviteUsers
);

router.get(
	'/:id/members',
	[param('id', 'A valid channel id is required').isMongoId(), checkErrors],
	getMembers
);

export default router;
