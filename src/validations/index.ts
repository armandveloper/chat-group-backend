import { CustomValidator } from 'express-validator';

export const isArrayOfEmail: CustomValidator = (emails: string[]) => {
	if (!emails) return false;
	for (const email of emails) {
		const isEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email);
		if (!isEmail) throw new Error('A valid email list is required');
	}
	return true;
};
