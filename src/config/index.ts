export default {
	PORT: process.env.PORT || 5000,
	DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/chat-group',
	CLIENT_URL: process.env.CLIENT_URL || 'http://192.168.0.17:3000',
	JWT_SECRET: process.env.JWT_SECRET || 'somesecrettoken',
	CLOUDINARY_URL: process.env.CLOUDINARY_URL || '',
};
