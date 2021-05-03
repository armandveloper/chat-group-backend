import express from 'express';
import passport from 'passport';
import passportConfig from './config/passport';
import config from './config';
import indexRoutes from './routes/index.routes';

const app = express();

app.set('PORT', config.PORT);

app.use(express.json());
app.use(passport.initialize());
passport.use(passportConfig);

app.use('/api', indexRoutes);

export default app;
