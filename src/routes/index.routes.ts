import { Router } from 'express';
import passport from 'passport';
import authRoutes from './auth.routes';
import usersRoutes from './users.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use(
	'/users',
	passport.authenticate('jwt', { session: false }),
	usersRoutes
);

export default router;
