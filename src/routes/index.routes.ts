import { Router } from 'express';
import passport from 'passport';
import authRoutes from './auth.routes';
import usersRoutes from './users.routes';
import channelsRoutes from './channels.routes';
import membershipRoutes from './membership.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use(
	'/users',
	passport.authenticate('jwt', { session: false }),
	usersRoutes
);
router.use(
	'/channels',
	passport.authenticate('jwt', { session: false }),
	channelsRoutes
);
router.use(
	'/membership',
	passport.authenticate('jwt', { session: false }),
	membershipRoutes
);

export default router;
