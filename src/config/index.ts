export default {
	PORT: process.env.PORT || 5000,
	DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/chat-group',
	JWT_SECRET: process.env.JWT_SECRET || 'somesecrettoken',
	CLOUDINARY_URL: process.env.CLOUDINARY_URL || '',
};
