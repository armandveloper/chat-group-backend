import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
	name: string;
	bio: string;
	email: string;
	password: string;
	phone: string;
	photo: string;
	hashPassword: (password: string) => Promise<void>;
	isValidPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	photo: {
		type: String,
		default:
			'https://res.cloudinary.com/dxmhr2agc/image/upload/v1596075793/fastshopping/profile/usuario_g6ovba.svg',
	},
});

userSchema.methods.hashPassword = async function (password) {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	this.password = hash;
};

userSchema.methods.isValidPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);
