import { Router } from 'express';
import { param } from 'express-validator';
import { checkErrors } from '../validations/checkErrors';
import {
	getMembership,
	replyInvitation,
} from '../controllers/membership.controller';

const router = Router();

router.put(
	'/:id',
	[param('id', 'A valid membership id is required').isMongoId(), checkErrors],
	getMembership,
	replyInvitation
);
router.get(
	'/:user',
	[param('user', 'A valid user id is required').isMongoId(), checkErrors],
	getMembership
);

export default router;
