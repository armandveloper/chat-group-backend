import { model, Document, Schema } from 'mongoose';

export interface IChannelUser extends Document {
	channel: string;
	user: string;
	userRole: 'creator' | 'guest';
	active: boolean;
}

const channelUserSchema = new Schema<IChannelUser>({
	channel: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Channel',
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	userRole: {
		type: String,
		required: true,
		enum: ['creator', 'guest'],
		default: 'guest',
	},
	active: {
		type: Boolean,
		required: true,
		default: false,
	},
});

export default model<IChannelUser>('ChannelUser', channelUserSchema);
