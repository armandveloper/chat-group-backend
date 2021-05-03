import { Request, Response } from 'express';
import Channel from '../models/Channel';
import User from '../models/User';
import ChannelUser from '../models/ChannelUser';

export const createChannel = async (req: Request, res: Response) => {
	const { name, description, creator } = req.body;
	try {
		const channelExists = await Channel.findOne({ name });
		if (channelExists) {
			return res
				.status(409)
				.json({ success: false, msg: 'Channel already exists' });
		}
		const channel = new Channel({ name, description, creator });
		await channel.save();
		const membership = new ChannelUser({
			channel: channel.id,
			user: creator,
			role: 'creator',
			active: true,
		});
		await membership.save();
		return res.status(201).json({ success: true, channel });
	} catch (err) {
		console.log('Channel creation error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something Went Wrong. Try later',
		});
	}
};

export const inviteUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { email } = req.body;
	try {
		const channel = await Channel.findById(id);
		if (!channel) {
			return res.status(404).json({
				success: false,
				msg: "Channel doesn't exists",
			});
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				success: false,
				msg: "User doesn't exists",
			});
		}
		const membership = new ChannelUser({
			channel: channel?.id,
			user: user?.id,
			role: 'guest',
			active: false,
		});
		await membership.save();
		return res
			.status(201)
			.json({ success: true, msg: 'Invitation was sent' });
	} catch (err) {
		console.log('Channel invite error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something Went Wrong. Try later',
		});
	}
};
