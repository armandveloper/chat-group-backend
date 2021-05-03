import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import User from '../models/User';
import config from '../config';

const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.JWT_SECRET,
};

export default new Strategy(opts, async (payload, done) => {
	try {
		const user = await User.findById(payload.id).select('email');
		if (user) {
			return done(null, user, payload);
		}
		return done(null, false);
	} catch {
		return done(null, false);
	}
});
