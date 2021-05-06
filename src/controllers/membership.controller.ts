import { Request, Response } from 'express';
import ChannelUser from '../models/ChannelUser';

export const replyInvitation = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { reply } = req.body;
	try {
		const membership = await ChannelUser.findById(id);
		if (!membership) {
			return res.status(403).json({
				success: false,
				msg: 'User has not been invited',
			});
		}
		// Si es false la rechazó
		if (!reply) {
			// Notificar al creador que no se aceptó la invitación y eliminar el registro
			await ChannelUser.findByIdAndDelete(membership.id);
			return res.json({ success: true, msg: 'Invitatipn declined' });
		}
		membership.active = true;
		await membership.save();
		// Notificar de nuevo miembro a todos los miembros del canal y al creador de la aceptación
		return res.json({ success: true, msg: 'Invitatipn accepted' });

		// membership.
	} catch (err) {
		console.log('Reply invitation error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something Went Wrong. Try later',
		});
	}
};

// Controlador que devuelve todos los canales a los que un usuario pertenece (en activo)
export const getMembership = async (req: Request, res: Response) => {
	const { user } = req.params;
	try {
		const channels = await ChannelUser.find({
			user,
			active: true,
		})
			.select('channel')
			.populate('channel', 'name description creator');
		res.json({ success: true, channels });
	} catch (err) {
		console.log('Get membership error:', err);
		res.status(500).json({
			success: false,
			msg: 'Something Went Wrong. Try later',
		});
	}
};
