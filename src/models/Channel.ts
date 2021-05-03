import { model, Document, Schema } from 'mongoose';

export interface IChannel extends Document {
	name: string;
	description: string;
	creator: string;
}

const channelSchema = new Schema<IChannel>({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	creator: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
});

export default model<IChannel>('Channel', channelSchema);
