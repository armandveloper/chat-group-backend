import mongoose from 'mongoose';
import config from './';

mongoose.connect(config.DB_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('Mongodb Connection established');
});

connection.on('error', (err) => {
	console.log('Mongodb connection error:', err);
	process.exit(1);
});
