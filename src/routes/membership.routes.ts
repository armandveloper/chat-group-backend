import { Router } from 'express';
import { replyInvitation } from '../controllers/membership.controller';

const router = Router();

router.put('/:id', replyInvitation);

export default router;
