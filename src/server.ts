import express from 'express';
import dontenv from 'dotenv';
import passport from 'passport';
import passportConfig from './config/passport';
import config from './config';
import indexRoutes from './routes/index.routes';

dontenv.config();

const app = express();

app.set('PORT', config.PORT);

app.use(express.json());
app.use(passport.initialize());
passport.use(passportConfig);

app.use('/api', indexRoutes);

export default app;
