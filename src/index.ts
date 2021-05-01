import app from './server';
import './config/database';

app.listen(app.get('PORT'), () => {
	console.log('Server is listening on port:', app.get('PORT'));
});
