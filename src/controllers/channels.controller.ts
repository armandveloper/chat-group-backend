import { Request, Response } from 'express';
import Channel from '../models/Channel';
import User, { IUser } from '../models/User';
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
			userRole: 'creator',
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

export const inviteUsers = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { emails } = req.body;
	try {
		const channel = await Channel.findById(id);
		if (!channel) {
			return res.status(404).json({
				success: false,
				msg: "Channel doesn't exists",
			});
		}
		const userPromises = emails.map((email: string) =>
			User.findOne({ email })
		);

		const usersResult: IUser[] = await Promise.all(userPromises);
		// Usuarios que si existan
		const validUsers = usersResult.filter((user) => user !== null);

		if (validUsers.length === 0) {
			return res.status(404).json({
				success: false,
				msg: "Someone users doesn't exists",
			});
		}

		// Para cada usuario crear una suscripción pendiente al canal
		const membershipPromises = validUsers.map((user: IUser) => {
			const membership = new ChannelUser({
				channel: channel?.id,
				user: user?.id,
				role: 'guest',
				active: false,
			});
			return membership.save();
		});

		const membershipResult = await Promise.all(membershipPromises);

		return res.status(201).json({
			success: true,
			msg: 'The invitations was sent',
			membershipResult,
		});
	} catch (err) {
		console.log('Channel invite error:', err);
		return res.status(500).json({
			success: false,
			msg: 'Something Went Wrong. Try later',
		});
	}
};

export const getMembers = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const members = await ChannelUser.find({ channel: id, active: true })
			.select('user')
			.populate('user', 'name email photo');
		res.json({ success: true, members });
	} catch (err) {
		console.log('Get channel members error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something Went Wrong. Try later',
		});
	}
};
